const { OrderDetail, Order, Item, user } = require("../models");

class OrderDetailRepository {
  async getOrder(userId) {
    return await OrderDetail.findAll({
      where: { userId: userId },
      include: [
        { model: user },
        {
          model: Order,
          as: "orders",
          include: { model: Item, left: true, as: "item" },
        },
      ],
    });
  }

  async getOrderBy(transactionId) {
    return await OrderDetail.findAll({
      where: transactionId,
      include: [
        { model: user },
        {
          model: Order,
          as: "orders",
          include: { model: Item, right: true, as: "item" },
        },
      ],
    });
  }

  async create(payload) {
    return await OrderDetail.create(payload);
  }

  async insert(payload) {
    return await OrderDetail.create(payload, {
      include: [
        {
          model: Order,
          as: "orders",
        },
      ],
    });
  }

  async update(transactionId, orderDetail) {
    return await OrderDetail.update(orderDetail, { where: transactionId });
  }
}

module.exports = OrderDetailRepository;
