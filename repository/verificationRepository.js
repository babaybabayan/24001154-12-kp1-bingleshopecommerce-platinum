const { verification } = require("../models");

class VerificationRepository{
    constructor(){}

    async find(user_id){
        return await verification.findOne({ where: { user_id } });
    }

    async delete_with_id(user_id){
        return await verification.destroy({ where: { user_id } });
    }

    async delete_with_tid(user_id, token){
        await verification.destroy({ where: { user_id, token } });
    }

    async save(user_id, token) {
        return await verification.create({ user_id, token });
    }
 
}

module.exports = VerificationRepository