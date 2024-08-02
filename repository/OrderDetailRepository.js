const { OrderDetail, Order, Item, user } = require("../models");

class OrderDetailRepository {
  async getOrder() {
    return await OrderDetail.findAll({
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

  async insert(payload) {
    console.log("🚀 ~ OrderDetailRepository ~ insert ~ payload:", payload);
    return await OrderDetail.create(payload, {
      include: [
        {
          model: Order,
          as: "orders",
        },
      ],
    });
  }
}

module.exports = OrderDetailRepository;
