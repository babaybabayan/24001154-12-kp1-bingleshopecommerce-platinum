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

/**
 * @swagger
 * /items:
 *   get:
 *     description: Retrieve the full list of stocks
 *     tags:
 *       - Get All Items
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: get All Items
 *         schema:
 *           $ref: '#/definitions/items'
 */
router.get("/", itemHandler.getAllItem);
router.get("/:id", itemHandler.getItemById);
router.put("/:id", itemHandler.update);
router.delete("/:id", itemHandler.delete);
router.post(
  "/",
  mustBeAuthenticated,
  isAdmin,
  setUploadPath("./public/uploads"),
  upload.array("images", 4),
  itemHandler.create
);

module.exports = router;
