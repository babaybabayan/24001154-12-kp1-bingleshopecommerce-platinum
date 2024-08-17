const { buildOrderDetail } = require("../dtos/reponse/OrderResponseDto");
const { STATUS } = require("../utils/Constants");
const { v4: uuidv4 } = require("uuid");

class TransactionService {
  constructor(detailRepository, cartRepository, orderRepository) {
    this.detailRepository = detailRepository;
    this.cartRepository = cartRepository;
    this.orderRepository = orderRepository;
  }

  async createOrder(payload) {
    try {
      const mutableRequest = payload;
      mutableRequest.transactionId = uuidv4();
      mutableRequest.status = STATUS.pending;
      const createTrasaction = await this.detailRepository.insert(
        mutableRequest
      );
      const carts = await this.cartRepository.getCart(mutableRequest.userId);
      const mappedCarts = carts.map((cart) => {
        return {
          itemId: cart.itemId,
          userId: cart.userId,
          quantity: cart.quantity,
          detailId: createTrasaction.id,
        };
      });
      await this.orderRepository.create(mappedCarts);
      return { status: 200, message: "success" };
    } catch (error) {
      return { status: 409, message: error.message };
    }
  }

  async getOrderList(payload) {
    try {
      const orders = await this.detailRepository.getOrder(payload);
      const buildOrder = buildOrderDetail(orders);
      return { status: 200, order: buildOrder };
    } catch (error) {
      return { status: 409, message: error.message };
    }
  }

  async getOrderBy(payload) {
    try {
      const orders = await this.detailRepository.getOrderBy(payload);
      const buildOrder = buildOrderDetail(orders);
      if (buildOrder.length > 0) {
        return { status: 200, order: buildOrder[0] };
      } else {
        return { status: 200, message: "User Tidak Ditemukan" };
      }
    } catch (error) {
      return { status: 409, message: error.message };
    }
  }

  async execute(transactionId) {
    try {
      const response = await this.detailRepository.getOrderBy(transactionId);
      const items = response.orders;
      var itemQuantity = [];

      for (let item of items) {
        if (item.quantity > item.item.stock) {
          itemQuantity.push(item.item.name);
        }
      }

      if (itemQuantity.length > 0) {
        return {
          status: 409,
          message: `${itemQuantity.join(", ")} Stock invalid`,
        };
      } else {
        for (let item of items) {
          let stock = item.item.stock - item.quantity;
          await this.itemRepository.update(item.id, { stock });
        }
      }
      await this.detailRepository.update(transactionId, {
        status: STATUS.success,
      });
      return { status: 200, message: "Transaction Success" };
    } catch (error) {
      return { status: 409, message: error.message };
    }
  }
}

module.exports = TransactionService;
