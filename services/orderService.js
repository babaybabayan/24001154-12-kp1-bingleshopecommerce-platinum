const { buildOrder } = require("../dtos/reponse/OrderResponseDto.js");
const OrderDto = require("../dtos/request/OrderRequestDto");
var _ = require("lodash");

class OrderService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async getAllOrders() {
    try {
      const orders = await this.orderRepository.getAllOrders();
      const populateOrders = orders.map((order) => {
        return buildOrder(order);
      });
      return { status: 200, orders: populateOrders };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  async getOrderById(id) {
    try {
      const order = await this.orderRepository.getOrderById(id);
      return { status: 200, order: buildOrder(order) };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  async deleteOrder(id) {
    try {
      const status = await this.orderRepository.delete(id);
      let message = status == 1 ? "Success" : "failed";
      let statusCode = status == 1 ? 201 : 400;
      return { status: statusCode, message: message };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  async updateOrder(id, orderData) {
    try {
      let existingOrder = await this.orderRepository.getOrderById(id);
      if (!existingOrder) {
        return { status: 400, message: "Data Not Found" };
      }
      await this.orderRepository.update(id, orderData);
      return { status: 201, message: "Order Updated" };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  async createOrder(orderData) {
    try {
      const bindingRequest = OrderDto.createRequestOrder(orderData);
      if (!_.isEmpty(bindingRequest.errors)) {
        return { status: 409, messages: bindingRequest.errors };
      }
      await this.orderRepository.create(bindingRequest.validatedData);
      return { status: 201, message: "Order Created" };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
}

module.exports = OrderService;
