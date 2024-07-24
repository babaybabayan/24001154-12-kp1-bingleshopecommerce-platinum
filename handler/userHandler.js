const AppReponseDto = require("../dtos/app_reponse.dto");
class UserHandler{
    constructor(userService, verificationService){
        this.userService = userService;
        this.verificationService = verificationService;
    }

    async register(req, res){
        const body = req.body;
        const register = await this.userService.register(body);
        await this.verificationService.save(register.id);
        res.send(AppReponseDto.buildSuccessWithDto(register.status, register.message));
    }

}

module.exports = UserHandler