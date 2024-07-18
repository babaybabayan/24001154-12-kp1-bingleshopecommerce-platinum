const router = require("express").Router();
const UserController = require("../controllers/UserController");
const { mustBeAuthenticated } = require("../middlewares/AuthMiddleware");

router.get("/", mustBeAuthenticated, UserController.index);

module.exports = router;