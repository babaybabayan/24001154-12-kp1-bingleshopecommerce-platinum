const router = require("express").Router();

const VerificationRepository = require("../repository/verificationRepository");
const UserRepository = require("../repository/userRepository");
const VerificationService = require("../services/verificationService");
const UserService = require("../services/userService");
const UserHandler = require("../handler/userHandler");

const { mustBeAuthenticated } = require("../middlewares/AuthMiddleware");

const userRepository = new UserRepository();
const verificationRepository = new VerificationRepository();
const userService = new UserService(userRepository);
const verificationService = new VerificationService(verificationRepository, userRepository);
const userHandler = new UserHandler(userService, verificationService);

router.post("/register", userHandler.register)

module.exports = router;