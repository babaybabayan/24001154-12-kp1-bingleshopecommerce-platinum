class CartService {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  async getCartList(userId) {
    try {
      const carts = await this.cartRepository.getCart(userId);
      return { status: 200, carts: carts };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  async create(payload) {
    try {
      const carts = await this.cartRepository.create(payload);
      return { status: 200, carts: carts };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  async delete(payload) {
    try {
      const itemId = payload.itemId;
      const userId = payload.userId;
      const status = await this.cartRepository.delete(userId, itemId);
      return { status: 200, message: status };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  async deleteAll(userId) {
    try {
      const status = await this.cartRepository.deleteAll(userId);
      return { status: 200, message: status };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
}

module.exports = CartService;
