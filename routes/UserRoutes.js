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

/**
 * @swagger
 * /users/login:
 *  post:
 *    tags:
 *      - login
 *    summary: Login User
 *    description: Login User
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: akbar@binar.com
 *              password:
 *                type: string
 *                default: binar123
 *    responses:
 *      200:
 *        description: Successful operation
 *        schema:
 *          $ref: '#/definitions/login'
 */
router.post("/login", userHandler.login);

module.exports = router;
