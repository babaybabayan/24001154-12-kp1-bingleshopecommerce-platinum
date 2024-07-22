const router = require("express").Router();

const VerificationRepository = require("../repository/verificationRepository");
const VerificationService = require("../services/verificationService");
const VerificationHandler = require("../handler/verificationHandler");

const verificationRepository = new VerificationRepository();
const verificationService = new VerificationService(verificationRepository);
const verificationHandler = new VerificationHandler(verificationService);

router.post('/verification/send', verificationHandler.save);

module.exports = router;