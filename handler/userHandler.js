const AppReponseDto = require("../dtos/app_reponse.dto");
class UserHandler{
    constructor(userService, verificationService){
        this.userService = userService;
        this.verificationService = verificationService;
        this.register = this.register.bind(this);
    }

    async register(req, res){
        const body = req.body;
        const register = await this.userService.register(body);
        await this.verificationService.save(register.id);
        return res.sendStatus(AppReponseDto.buildSuccessWithDto(register.status, register.message));
    }

}

module.exports = UserHandler