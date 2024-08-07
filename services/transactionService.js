const { buildOrderDetail } = require("../dtos/reponse/OrderResponseDto");
const { STATUS } = require("../utils/Constants");

class TransactionService {
  constructor(detailRepository, itemRepository) {
    this.detailRepository = detailRepository;
    this.itemRepository = itemRepository;
  }

  async createOrder(payload) {
    try {
      await this.detailRepository.insert(payload);
      return { status: 200, message: "success" };
    } catch (error) {
      return { status: 409, message: error.message };
    }
  }

  async getOrderList() {
    try {
      const orders = await this.detailRepository.getOrder();
      const buildOrder = buildOrderDetail(orders);
      return { status: 200, order: buildOrder };
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
