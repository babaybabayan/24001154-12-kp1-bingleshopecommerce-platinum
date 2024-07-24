const { Verification, user } = require("../models");

class UserRepository{
    constructor(){

    }

    async find(email){
        return await user.findOne({ where: { email } });
    }

    async save(body){
        const save = await user.create({ 
            username : body.username,
            email : body.email,
            password : body.password,
            role : body.role
        });
        return { id: save.id };
    }

    async verify(user_id){
        return await user.update({ verified: true }, { where: { id: user_id } });
    }

}

module.exports = UserRepository;