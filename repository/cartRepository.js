const { Cart } = require("../models");
const { Op } = require("sequelize");

class CartRepository {
  async getCart(userId) {
    const carts = await Cart.findAll({ where: { userId: userId } });
    return carts;
  }

  async create(payload) {
    const cart = await Cart.create({
      itemId: payload.itemId,
      quantity: payload.quantity,
      userId: payload.userId,
    });
    return cart;
  }

  async deleteAll(userId) {
    const status = await Cart.destroy({ where: { userId: userId } });
    return status;
  }

  async delete(userId, itemId) {
    const status = await Cart.destroy({
      where: {
        [Op.and]: [{ userId: userId }, { itemId: itemId }],
      },
    });
    return status;
  }
}

module.exports = CartRepository;
