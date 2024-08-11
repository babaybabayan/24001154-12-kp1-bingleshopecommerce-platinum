class OrderHandler {
    constructor(orderService) {
      this.orderService = orderService;
      this.getAllOrders = this.getAllOrders.bind(this);
      this.getOrderById = this.getOrderById.bind(this);
      this.updateOrder = this.updateOrder.bind(this);
      this.deleteOrder = this.deleteOrder.bind(this);
      this.createOrder = this.createOrder.bind(this);
    }
  
    async getAllOrders(req, res) {
      const serviceResponse = await this.orderService.getAllOrders();
      return res.status(serviceResponse.status).send(serviceResponse);
    }
  
    async getOrderById(req, res) {
      const id = req.params.id;
      const serviceResponse = await this.orderService.getOrderById(id);
      return res.status(serviceResponse.status).send(serviceResponse);
    }
  
    async updateOrder(req, res) {
      const id = req.params.id;
      const payload = req.body;
      const serviceResponse = await this.orderService.updateOrder(id, payload);
      return res.status(serviceResponse.status).send(serviceResponse);
    }
  
    async deleteOrder(req, res) {
      const id = req.params.id;
      const serviceResponse = await this.orderService.deleteOrder(id);
      return res.status(serviceResponse.status).send(serviceResponse);
    }
  
    async createOrder(req, res) {
      const payload = req.body;
      const serviceResponse = await this.orderService.createOrder(payload);
      return res.status(serviceResponse.status).send(serviceResponse);
    }
  }
  
  module.exports = OrderHandler;
  