const router = require("express").Router();
const CartRepository = require("../repository/cartRepository");
const CartService = require("../services/cartService");
const CartHandler = require("../handler/cartHandler");
const { mustBeAuthenticated } = require("../middlewares/AuthMiddleware");

const cartRepository = new CartRepository();
const cartService = new CartService(cartRepository);
const cartHandler = new CartHandler(cartService);

router.get("/show", mustBeAuthenticated, cartHandler.getCartList);
router.post("/add", mustBeAuthenticated, cartHandler.create);
router.delete("/remove", mustBeAuthenticated, cartHandler.delete);
router.delete("/remove-all", mustBeAuthenticated, cartHandler.deleteAll);

module.exports = router;
