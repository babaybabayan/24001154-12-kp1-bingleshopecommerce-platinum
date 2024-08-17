const router = require("express").Router();
const OrderDetailRepository = require("../repository/OrderDetailRepository");
const CartRepository = require("../repository/cartRepository");
const OrderRepository = require("../repository/orderRepository");
const TransactionService = require("../services/transactionService");
const TransactionHandler = require("../handler/transactionHandler");
const { mustBeAuthenticated } = require("../middlewares/AuthMiddleware");
const { isAdmin } = require("../middlewares/RoleMiddleware");

const cartRepository = new CartRepository();
const orderDetailRepository = new OrderDetailRepository();
const orderRepository = new OrderRepository();
const transactionService = new TransactionService(
  orderDetailRepository,
  cartRepository,
  orderRepository
);
const transactionHandler = new TransactionHandler(transactionService);

router.get("/", mustBeAuthenticated, transactionHandler.index);
router.post("/create", mustBeAuthenticated, transactionHandler.create);
router.post("/status", mustBeAuthenticated, transactionHandler.getOrderBy);
router.post(
  "/execution",
  mustBeAuthenticated,
  isAdmin,
  transactionHandler.execute
);
module.exports = router;
