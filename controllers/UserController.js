const { User } = require("../models");
var _ = require("lodash");
const AppReponseDto = require("../dtos/app_reponse.dto");
const ItemDto = require("../dtos/request/ItemRequestDto");
const { buildItem } = require("../dtos/reponse/ItemResponseDto");

class UserController {
  constructor() {
    // this.user = user;
  }
  async index(req, res) {
    const users = await User.findAll();
    const populateItem = users.map((item) => {
      return buildItem(item);
    });
    return res.json(AppReponseDto.buildSuccessWithDto(populateItem));
  }
}

module.exports = new UserController();
