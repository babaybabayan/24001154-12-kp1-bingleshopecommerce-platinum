const router = require("express").Router();
const VerificationController = require("../controllers/VerificationController");

router.post('/verification/send', VerificationController.send);

module.exports = router;