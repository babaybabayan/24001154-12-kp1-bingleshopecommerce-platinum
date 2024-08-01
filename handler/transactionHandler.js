const AppReponseDto = require("../dtos/app_reponse.dto");
class TransactionHandler {
  constructor(transactionService) {
    this.transactionService = transactionService;
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  async index(req, res) {
    const response = await this.transactionService.getOrderList();
    return res.status(response.status).send(response);
  }

  async create(req, res) {
    const { payload } = req.body;
    const response = await this.transactionService.createOrder(payload);
    return res.status(response.status).send(response.order);
  }

  async update(req, res) {
    const { payload } = req.body;
    const response = await this.transactionService.update(payload);
    return res.status(response.status).send(response);
  }
}

module.exports = TransactionHandler;
