const { buildOrderDetail } = require("../dtos/reponse/OrderResponseDto");

class TransactionService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async createOrder(payload) {}

  async getOrderList() {
    try {
      const orders = await this.orderRepository.getOrder();
      console.log("🚀 ~ TransactionService ~ getOrderList ~ orders:", orders);
      const buildOrder = buildOrderDetail(orders);
      return { status: 200, order: buildOrder };
    } catch (error) {
      return { status: 409, message: error.message };
    }
  }

  async update(payload) {}
}

module.exports = TransactionService;
