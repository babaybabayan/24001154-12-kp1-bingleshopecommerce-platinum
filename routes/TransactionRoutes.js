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
router.post("/", transactionHandler.create);
module.exports = router;
