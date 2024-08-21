const router = require("express").Router();

const { mustBeAuthenticated } = require("../middlewares/AuthMiddleware");
const { isAdmin } = require("../middlewares/RoleMiddleware");
const VerificationRepository = require("../repository/verificationRepository");
const VerificationService = require("../services/verificationService");
const VerificationHandler = require("../handler/verificationHandler");
const EmailService = require("../services/emailService");
const UserRepository = require("../repository/userRepository");
const userRepository = new UserRepository();

const emailService = new EmailService();
const verificationRepository = new VerificationRepository();
const verificationService = new VerificationService(
  verificationRepository,
  userRepository
);
const verificationHandler = new VerificationHandler(
  verificationService,
  emailService
);

router.post("/send", mustBeAuthenticated, isAdmin, verificationHandler.save);
router.post(
  "/verify",
  mustBeAuthenticated,
  isAdmin,
  verificationHandler.verify
);

module.exports = router;
