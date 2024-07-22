const router = require("express").Router();

const { mustBeAuthenticated } = require("../middlewares/AuthMiddleware");
const { isAdmin } = require("../middlewares/RoleMiddleware");
const { setUploadPath } = require("../middlewares/UploadMiddleware");
const ItemRepository = require("../repository/itemRepository");
const ItemService = require("../services/itemService");
const ItemHandler = require("../handler/itemHandler");
const { upload } = require("../utils/upload");

const itemRepository = new ItemRepository();
const itemService = new ItemService(itemRepository);
const itemHandler = new ItemHandler(itemService);

router.get("/", mustBeAuthenticated, itemHandler.getAllItem);
router.get("/:id", mustBeAuthenticated, itemHandler.getItemById);
router.put("/:id", mustBeAuthenticated, isAdmin, itemHandler.update);
router.delete("/:id", mustBeAuthenticated, isAdmin, itemHandler.delete);
router.post(
  "/",
  mustBeAuthenticated,
  isAdmin,
  setUploadPath("./public/uploads"),
  upload.array("images", 4),
  itemHandler.create
);

module.exports = router;
