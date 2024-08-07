const router = require("express").Router();

const { mustBeAuthenticated } = require("../middlewares/AuthMiddleware");
const { isAdmin } = require("../middlewares/RoleMiddleware");
const { setUploadPath } = require("../middlewares/UploadMiddleware");
const ItemRepository = require("../repository/itemRepository");
const ItemService = require("../services/itemService");
const CloudService = require("../services/CloudinaryService");
const ItemHandler = require("../handler/itemHandler");
const memoryStorage = require("../utils/memoryStorage");
const cloudinary = require("../config/claudinaryConfig");

const itemRepository = new ItemRepository();
const itemService = new ItemService(itemRepository);
const cloudService = new CloudService(cloudinary);
const itemHandler = new ItemHandler(itemService, cloudService);

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
router.post("/", memoryStorage.single("image"), itemHandler.create);

module.exports = router;
