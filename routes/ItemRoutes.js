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
 *     tags:
 *       - Items
 *     summary: Get All Item
 *     description: Item List
 *     responses:
 *       200:
 *         description: get All Items
 *         schema:
 *           $ref: '#/definitions/items'
 */
router.get("/", mustBeAuthenticated, itemHandler.getAllItem);
/**
 * @swagger
 * /items/{itemId}:
 *   get:
 *     tags:
 *       - Items
 *     summary: Get Item By Id
 *     description: Get Item By Id
 *     parameters:
 *      - in: path
 *        name: itemId
 *        schema:
 *          type: integer
 *        required: true
 *     responses:
 *       200:
 *         description: Get Item By Id
 *         schema:
 *           $ref: '#/definitions/items'
 */
router.get("/:id", itemHandler.getItemById);
router.put("/:id", mustBeAuthenticated, isAdmin, itemHandler.update);
router.delete("/:id", mustBeAuthenticated, isAdmin, itemHandler.delete);
/**
 * @swagger
 * /items:
 *  post:
 *    tags:
 *      - Items
 *    summary: Create Item
 *    description: Create Item
 *    parameters:
 *      - in: path
 *        name: Authorized
 *        schema:
 *          type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *            - name
 *            - description
 *            - price
 *            - stock
 *            - image_url
 *            properties:
 *              name:
 *                type: string
 *                default: item 1
 *              description:
 *                type: string
 *                default: Description 1
 *              price:
 *                type: integer
 *                default: 5000
 *              stock:
 *                type: integer
 *                default: 5
 *              image_url:
 *                type: string
 *                default: "image"
 *    responses:
 *      200:
 *        description: Successful operation
 *        schema:
 *          $ref: '#/definitions/items'
 */
router.post("/", mustBeAuthenticated, isAdmin, itemHandler.create);
/**
 * @swagger
 * /items/upload:
 *   post:
 *     tags:
 *       - Items
 *     summary: Upload Item
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             description: The file to upload.
 *             type: string
 *             format: binary
 *     responses:
 *       200:
 *         description: Media uploaded successfully
 */
router.post("/upload", memoryStorage.single("image"), itemHandler.upload);

module.exports = router;
