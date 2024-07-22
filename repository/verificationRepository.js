const { Verification, User } = require("../models");

class VerificationRepository{
    constructor(){}

    async find(user_id){
        return await Verification.findOne({ where: { user_id } });
    }

    async save(user_id, token) {
        const check = this.find({ where: { user_id } });
        if(check){
            await Verification.delete({ where: { user_id } });
            return await Verification.create({ user_id, token });
        }else{
            return await Verification.create({ user_id, token });
        }
    }

    async verify(user_id, token){
        const check = this.find({ where: { user_id } });
        if(check){
            await Verification.delete({ where: { user_id, token } });
            return await User.update({ verified: true }, { where: { id: user_id } });
        }else{
            return false;
        }
    }
 
}

module.exports = VerificationRepository