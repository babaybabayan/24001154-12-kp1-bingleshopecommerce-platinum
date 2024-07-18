const router = require("express").Router();
const ItemController = require("../controllers/ItemController");
const { mustBeAuthenticated } = require("../middlewares/AuthMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");

router.get("/", mustBeAuthenticated, ItemController.index);
router.get("/:id", mustBeAuthenticated, ItemController.getById);
router.put("/:id", mustBeAuthenticated, isAdmin, ItemController.update);
router.delete("/:id", mustBeAuthenticated, isAdmin, ItemController.delete);
router.post("/", mustBeAuthenticated, isAdmin, ItemController.create);

module.exports = router;
