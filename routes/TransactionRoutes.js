const router = require("express").Router();
const { mustBeAuthenticated } = require("../middlewares/AuthMiddleware");
const OrderDetailRepository = require("../repository/OrderDetailRepository");
const ItemDetailRepository = require("../repository/itemRepository");
const TransactionService = require("../services/transactionService");
const TransactionHandler = require("../handler/transactionHandler");

const orderDetailRepository = new OrderDetailRepository();
const itemRepository = new ItemDetailRepository();
const transactionService = new TransactionService(
  orderDetailRepository,
  itemRepository
);
const transactionHandler = new TransactionHandler(transactionService);

router.get("/", transactionHandler.index);
router.post("/", transactionHandler.create);
router.post("/execution", transactionHandler.execute);
module.exports = router;
