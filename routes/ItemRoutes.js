const router = require("express").Router();
const ItemController = require("../controllers/ItemController");
const {
  mustBeAuthenticated,
  isAdmin,
} = require("../middlewares/AuthMiddleware");

router.get("/", mustBeAuthenticated, ItemController.index);
router.get("/:id", ItemController.getById);
router.put("/:id", ItemController.update);
router.delete("/:id", ItemController.delete);
router.post("/", ItemController.create);

module.exports = router;
