const router = require("express").Router();

const VerificationRepository = require("../repository/verificationRepository");
const VerificationService = require("../services/verificationService");
const VerificationHandler = require("../handler/verificationHandler");

const UserRepository = require("../repository/userRepository");
const userRepository = new UserRepository();


const verificationRepository = new VerificationRepository();
const verificationService = new VerificationService(verificationRepository, userRepository);
const verificationHandler = new VerificationHandler(verificationService);

router.post('/send', verificationHandler.save);
router.post('/verify', verificationHandler.verify);

module.exports = router;