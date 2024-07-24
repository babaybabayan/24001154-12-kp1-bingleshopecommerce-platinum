const { Verification } = require("../models");

class VerificationRepository{
    constructor(){}

    async find(user_id){
        return await Verification.findOne({ where: { user_id } });
    }

    async delete_with_id(user_id){
        return await Verification.delete({ where: { user_id } });
    }

    async delete_with_tid(user_id, token){
        await Verification.delete({ where: { user_id, token } });
    }

    async save(user_id, token) {
        return await Verification.create({ user_id, token });
    }
 
}

module.exports = VerificationRepository