const { user } = require("../models");

class UserRepository {
  constructor() {}

  async find(email) {
    return await user.findOne({ where: { email: email } });
  }

  async findByUsername(username) {
    return await user.findOne({ where: { username: username } });
  }

  async find_by_empas(email, password) {
    return await user.findOne({
      where: {
        email: email,
        password: password,
        verified: true,
      },
    });
  }

  async find_by_id(id) {
    return await user.findOne({ where: { id } });
  }

  async save(body) {
    const save = await user.create({
      username: body.username,
      email: body.email,
      password: body.password,
      role: body.role,
    });
    return { id: save.id };
  }

  async verify(id) {
    return await user.update({ verified: true }, { where: { id } });
  }
}

module.exports = UserRepository;
