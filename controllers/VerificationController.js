const { Verification } = require("../models");
const AppReponseDto = require("../dtos/app_reponse.dto");

class VerificationController {
    constructor() {
        // this.user = user;
    }
    async send(req, res) {
        const body = req.body;
        const user_id = body.user_id;
        const token = this.generateRandomCode();
        // Simpan di database
        const save = await Verification.create({ user_id, token });
        // Kirim email - TBA
        res.send(AppReponseDto.buildSuccessWithDto(200, "Berhasil", token));
    }

    async verify(req, res){
        const params = req.params;
        // TBA
    }

    // Utility
    generateRandomCode() {
        const prefix = 'BGL';
        const date = new Date();
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getFullYear()).slice(-2)}`;
        const uniqueCode = this.generateUniqueCode(5);
        return `${prefix}-${formattedDate}-${uniqueCode}`;
    }

    generateUniqueCode(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }
        return result;
    }
}

module.exports = new VerificationController();