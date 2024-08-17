const AppReponseDto = require("../dtos/app_reponse.dto");
class TransactionHandler {
  constructor(transactionService) {
    this.transactionService = transactionService;
    this.index = this.index.bind(this);
    this.create = this.create.bind(this);
    this.execute = this.execute.bind(this);
    this.getOrderBy = this.getOrderBy.bind(this);
  }

  async index(req, res) {
    const payload = req.user.userId;
    const response = await this.transactionService.getOrderList(payload);
    return res.status(response.status).send(response);
  }

  async getOrderBy(req, res) {
    const payload = req.body;
    const response = await this.transactionService.getOrderBy(payload);
    return res.status(response.status).send(response);
  }

  async create(req, res) {
    const payload = req.body;
    payload.userId = req.user.userId;
    const response = await this.transactionService.createOrder(payload);
    return res.status(response.status).send(response.message);
  }

  async execute(req, res) {
    const payload = req.body;
    const response = await this.transactionService.execute(payload);
    return res.status(response.status).send(response);
  }
}

module.exports = TransactionHandler;
