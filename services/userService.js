const crypto = require('crypto')

class UserService{
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async register(body){
        try{
            const check = await this.userRepository.find(body.email);
            if(check){
                return { status: 500, message: "Email telah terdaftar sebelumnya" }; 
            }
            const data = { 
                username : body.username,
                email : body.email,
                password : crypto.createHash('md5').update(body.password).digest('hex'),
                role : 'user'
            };
            const save = await this.userRepository.save(data);
            return { status: 200, message: "Berhasil", id: save.id };
        }catch(error){ 
            return { status: 500, message: error.message };
        }
    }
}

module.exports = UserService