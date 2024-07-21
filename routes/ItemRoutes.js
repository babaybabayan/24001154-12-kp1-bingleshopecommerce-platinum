const router = require("express").Router();

const { mustBeAuthenticated } = require("../middlewares/AuthMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");

const ItemRepository = require("../repository/itemRepository");
const ItemService = require("../services/itemService");
const ItemHandler = require("../handler/itemHandler");

const itemRepository = new ItemRepository();
const itemService = new ItemService(itemRepository);
const itemHandler = new ItemHandler(itemService);

router.get("/", mustBeAuthenticated, itemHandler.getAllItem);
router.get("/:id", mustBeAuthenticated, itemHandler.getItemById);
router.put("/:id", mustBeAuthenticated, isAdmin, itemHandler.update);
router.delete("/:id", mustBeAuthenticated, isAdmin, itemHandler.delete);
router.post("/", mustBeAuthenticated, isAdmin, itemHandler.create);

module.exports = router;
