const AppReponseDto = require("../dtos/app_reponse.dto");
class VerificationHandler {
  constructor(verificationService, emailService) {
    this.verificationService = verificationService;
    this.emailService = emailService;
    this.save = this.save.bind(this);
    this.verify = this.verify.bind(this);
  }

  async save(req, res) {
    const body = req.body;
    const user_id = body.user_id;
    const sendVerification = await this.verificationService.save(
      user_id,
      this.emailService
    );
    res.status(sendVerification.status).json(sendVerification);
  }

  async verify(req, res) {
    const body = req.body;
    const user_id = body.user_id;
    const token = body.token;
    const verify = await this.verificationService.verify(user_id, token);
    res.status(verify.status).json(verify);
  }
}

module.exports = VerificationHandler;
