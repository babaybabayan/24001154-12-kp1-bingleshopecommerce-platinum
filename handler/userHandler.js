const AppReponseDto = require("../dtos/app_reponse.dto");
class UserHandler {
  constructor(userService, verificationService, emailService) {
    this.userService = userService;
    this.verificationService = verificationService;
    this.emailService = emailService;
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async login(req, res) {
    const { username, email, password } = req.body;
    const login = await this.userService.login(username, email, password);
    res.json({ userWithToken: login.userWithToken });
  }

  async register(req, res) {
    const body = req.body;
    const register = await this.userService.register(body);
    if (register.status === 500) {
      return res.sendStatus(
        AppReponseDto.buildErrorWithDto(register.status, register.message)
      );
    }
    await this.verificationService.save(register.id, this.emailService);
    return res.sendStatus(
      AppReponseDto.buildSuccessWithDto(register.status, register.message)
    );
  }
}

module.exports = UserHandler;
