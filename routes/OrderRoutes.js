const router = require("express").Router();

const { mustBeAuthenticated } = require("../middlewares/AuthMiddleware");
const { isAdmin } = require("../middlewares/RoleMiddleware");
const OrderRepository = require("../repository/orderRepository");
const OrderService = require("../services/orderService");
const OrderHandler = require("../handler/orderHandler");

const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);
const orderHandler = new OrderHandler(orderService);

router.get("/", mustBeAuthenticated, orderHandler.getAllOrders);
router.get("/:id", mustBeAuthenticated, orderHandler.getOrderById);
router.put("/:id", mustBeAuthenticated, orderHandler.updateOrder);
router.delete("/:id", mustBeAuthenticated, orderHandler.deleteOrder);
router.post("/", mustBeAuthenticated, orderHandler.createOrder);

module.exports = router;
