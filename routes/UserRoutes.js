const router = require("express").Router();

const VerificationRepository = require("../repository/verificationRepository");
const UserRepository = require("../repository/userRepository");
const VerificationService = require("../services/verificationService");
const UserService = require("../services/userService");
const UserHandler = require("../handler/userHandler");
const EmailService = require("../services/emailService");

const userRepository = new UserRepository();
const verificationRepository = new VerificationRepository();
const userService = new UserService(userRepository);
const emailService = new EmailService();
const verificationService = new VerificationService(
  verificationRepository,
  userRepository
);
const userHandler = new UserHandler(
  userService,
  verificationService,
  emailService
);

router.post("/register", userHandler.register);
router.post("/login", userHandler.login);

module.exports = router;
