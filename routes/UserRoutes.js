const router = require("express").Router();

const UserRepository = require("../repository/userRepository");
const UserService = require("../services/userService");
const UserHandler = require("../handler/userHandler");

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userHandler = new UserHandler(userService);

const { mustBeAuthenticated } = require("../middlewares/AuthMiddleware");

router.post("/api/auth/register", userHandler.register)

module.exports = router;