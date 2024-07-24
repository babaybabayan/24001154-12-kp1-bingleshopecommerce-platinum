const AppReponseDto = require("../dtos/app_reponse.dto");
class VerificationHandler{
    constructor(verificationService){
        this.verificationService = verificationService;
        this.save = this.save.bind(this);
    }

    async save(req, res) {
        const body = req.body;
        const user_id = body.user_id;
        const sendVerification = await this.verificationService.save(user_id);
        res.send(AppReponseDto.buildSuccessWithDto(sendVerification.status, sendVerification.message));
    }
}

module.exports = VerificationHandler