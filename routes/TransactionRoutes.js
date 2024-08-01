const router = require("express").Router();
const { mustBeAuthenticated } = require("../middlewares/AuthMiddleware");
const OrderDetailRepository = require("../repository/OrderDetailRepository");
const TransactionService = require("../services/transactionService");
const TransactionHandler = require("../handler/transactionHandler");

const orderDetailRepository = new OrderDetailRepository();
const transactionService = new TransactionService(orderDetailRepository);
const transactionHandler = new TransactionHandler(transactionService);

const { OrderDetail, Order, Item, user } = require("../models");

router.get("/", transactionHandler.index);

router.post("/", (req, res) => {
  const { payload } = req.body;
});

router.get("/user", (req, res) => {
  user
    .findAll({ include: { model: OrderDetail } })
    .then((user) => {
      return res.json({ user });
    })
    .catch((err) => {
      return res.json(err.message);
    });
});
module.exports = router;
