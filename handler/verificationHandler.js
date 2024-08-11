const AppReponseDto = require("../dtos/app_reponse.dto");
class VerificationHandler{
    constructor(verificationService){
        this.verificationService = verificationService;
        this.save = this.save.bind(this);
        this.verify = this.verify.bind(this);
    }

    async save(req, res) {
        const body = req.body;
        const user_id = body.user_id;
        const sendVerification = await this.verificationService.save(user_id);
        res.sendStatus(AppReponseDto.buildSuccessWithDto(sendVerification.status, sendVerification.message));
    }

    async verify(req, res){
        const body = req.body;
        const user_id = body.user_id;
        const token = body.token;   
        const verify = await this.verificationService.verify(user_id, token);
        console.log(verify)
        res.send(AppReponseDto.buildSuccessWithDto(verify.status, verify.message));
    }
}

module.exports = VerificationHandler