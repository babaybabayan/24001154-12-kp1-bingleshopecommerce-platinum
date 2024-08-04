const crypto = require("crypto");
const { signToken } = require("../utils/GenerateToken");
const { USER_ROLE } = require("../utils/Constants");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async login(username, email, password) {
    try {
      var user;
      if (username) {
        user = await this.userRepository.findByUsername(username);
      } else if (email) {
        user = await this.userRepository.find(email);
      } else {
        return { status: 409, message: "username or password cannot be empty" };
      }

      if (!user) {
        return { status: 409, message: "username not found" };
      }

      let hashPassword = crypto
        .createHash("md5")
        .update(password)
        .digest("hex");
      let isMatchUserPassword = user.password === hashPassword;

      if (!isMatchUserPassword) {
        return { status: 409, message: "Wrong password" };
      }
      const generatedToken = signToken({
        user: user.username,
        password: hashPassword,
        role: user.role,
      });
      if (generatedToken) {
        const userWithToken = {
          status: 200,
          message: "Login Succes",
          username: user.username,
          token: generatedToken,
          role: user.role,
        };
        return { userWithToken };
      } else {
        return { status: 500, message: "Failed Generate Token User" };
      }
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  async updateVerifiedUser() {}

  async register(body) {
    try {
      const check = await this.userRepository.find(body.email);
      if (check) {
        return { status: 500, message: "Email telah terdaftar sebelumnya" };
      }
      const data = {
        username: body.username,
        email: body.email,
        password: crypto.createHash("md5").update(body.password).digest("hex"),
        role: USER_ROLE.isUser,
      };
      const save = await this.userRepository.save(data);
      return { status: 200, message: "Berhasil", id: save.id };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
}

module.exports = UserService;
