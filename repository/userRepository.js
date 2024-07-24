const { Verification, User } = require("../models");

class UserRepository{
    constructor(){

    }

    async find(email){
        return await User.findOne({ where: { email } });
    }

    async save(body){
        const save = await User.create({ 
            username : body.username,
            email : body.email,
            password : body.password,
            role : body.role
        });
        return { id: save.id };
    }

    async verify(user_id){
        return await User.update({ verified: true }, { where: { id: user_id } });
    }

}

module.exports = UserRepository;