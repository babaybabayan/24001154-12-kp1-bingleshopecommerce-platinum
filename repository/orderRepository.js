const { Order } = require("../models");

class OrderRepository {
  constructor() {}

  async getAllOrders() {
    return await Order.findAll();
  }

  async getOrderById(id) {
    return await Order.findByPk(id);
  }

  async update(id, orderData) {
    const { user_id, item_id, quantity, total_price, status } = orderData;
    return await Order.update(
      {
        user_id,
        item_id,
        quantity,
        total_price,
        status,
      },
      { where: { id } }
    );
  }

  async delete(id) {
    return await Order.destroy({ where: { id } });
  }

  async create(payload) {
    return await Order.bulkCreate(payload);
  }
}

module.exports = OrderRepository;
