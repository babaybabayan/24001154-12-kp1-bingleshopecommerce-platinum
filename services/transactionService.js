const { buildOrderDetail } = require("../dtos/reponse/OrderResponseDto");

class TransactionService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async createOrder(payload) {
    try {
      await this.orderRepository.insert(payload);
      return { status: 200, message: "success" };
    } catch (error) {
      return { status: 409, message: error.message };
    }
  }

  async getOrderList() {
    try {
      const buildOrder = buildOrderDetail(orders);
      return { status: 200, order: buildOrder };
    } catch (error) {
      return { status: 409, message: error.message };
    }
  }

  async update(payload) {}
}

module.exports = TransactionService;
