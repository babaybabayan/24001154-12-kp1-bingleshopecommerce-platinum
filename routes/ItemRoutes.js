const router = require("express").Router();

const { mustBeAuthenticated } = require("../middlewares/AuthMiddleware");
const { isAdmin } = require("../middlewares/RoleMiddleware");
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
router.get("/:id", mustBeAuthenticated, itemHandler.getItemById);
router.put("/:id", mustBeAuthenticated, isAdmin, itemHandler.update);
router.delete("/:id", mustBeAuthenticated, isAdmin, itemHandler.delete);
/**
 * @swagger
 * /items:
 *  post:
 *    tags:
 *      - Create Item
 *    summary: Create Item
 *    description: Create Item
 *    produces:
 *      - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: akbar@gmail.com
 *              password:
 *                type: string
 *                default: akbar1234
 *    responses:
 *      200:
 *        description: Successful operation
 *        schema:
 *          $ref: '#/definitions/login'
 */
router.post(
  "/",
  mustBeAuthenticated,
  isAdmin,
  memoryStorage.single("image"),
  itemHandler.create
);

module.exports = router;
