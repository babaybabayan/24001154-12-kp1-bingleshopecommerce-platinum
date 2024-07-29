const crypto = require('crypto')

class AuthService{
    constructor(userRepository){
        this.userRepository = userRepository;
    }

    async login(email, password){
        try{
            let hash = crypto.createHash('md5').update(password).digest("hex")
            const check = await this.userRepository.find_by_empas(email, hash);
            if(check){
                return { status: 200, message: "Login successfull" };
            }else{
                return { status: 500, message: "Login failed" };
            }
        }catch(error){
            return { status: 500, message: error.message };
        }
    }
}