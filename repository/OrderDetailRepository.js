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
}

module.exports = OrderDetailRepository;
