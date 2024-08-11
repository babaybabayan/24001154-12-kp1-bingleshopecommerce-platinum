const AppReponseDto = require("../dtos/app_reponse.dto");

class AuthHandler{
    constructor(authService){
        this.authService = authService;
        this.login = this.login.bind(this);
    }

    async login(req, res){
        const body = req.body;
        const email = body.email;
        const password = body.password;
        const login = await this.authService.login(email, password);
        res.send(AppReponseDto.buildSuccessWithDto(login.status, login.message));
    }
}

module.exports = AuthHandler;