class CartHandler {
  constructor(cartService) {
    this.cartService = cartService;
    this.getCartList = this.getCartList.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
  }

  async getCartList(req, res) {
    const userId = req.user.userId;
    const response = await this.cartService.getCartList(userId);
    return res.status(response.status).send(response);
  }

  async create(req, res) {
    const cartRequest = req.body;
    cartRequest.userId = req.user.userId;
    const response = await this.cartService.create(cartRequest);
    return res.status(response.status).send(response);
  }

  async delete(req, res) {
    const payload = req.user;
    payload.itemId = req.body.itemId;
    const response = await this.cartService.delete(payload);
    return res.status(response.status).send(response);
  }

  async deleteAll(req, res) {
    const userId = req.user.userId;
    const response = await this.cartService.deleteAll(userId);
    return res.status(response.status).send(response);
  }
}

module.exports = CartHandler;
