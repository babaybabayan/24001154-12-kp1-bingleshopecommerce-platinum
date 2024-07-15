const { Item } = require("../models");
var _ = require("lodash");
const AppReponseDto = require("../dtos/app_reponse.dto");
const ItemDto = require("../dtos/request/ItemRequestDto");
const { buildItem } = require("../dtos/reponse/ItemResponseDto");

class ItemController {
  async index(req, res) {
    const items = await Item.findAll();
    const populateItem = items.map((item) => {
      console.log(item);
      return buildItem(item);
    });
    return res.json(AppReponseDto.buildSuccessWithDto(populateItem));
  }

  async getById(req, res) {
    const id = req.params.id;
    const item = await Item.findByPk(id);
    return res.json(buildItem(item));
  }

  async update(req, res) {
    const id = req.params.id;
    const { name, description, price, imageUrl } = req.body;
    const item = await Item.findByPk(id);
    if (!item) {
      return res.json(
        AppReponseDto.buildWithErrorMessages("item cannot be found")
      );
    }

    await Item.update(
      {
        name: name,
        description: description,
        price: price,
        imageUrl: imageUrl,
      },
      { where: { id: item.id } }
    );

    return res.json(AppReponseDto.buildSimpleSuccess());
  }

  async delete(req, res) {
    const id = req.params.id;
    const status = await Item.destroy({ where: { id: id } });
    let message = status == 1 ? "Success" : "failed";
    let statusCode = status == 1 ? 201 : 400;
    let dto =
      status == 1
        ? AppReponseDto.buildSuccessWithMessages(message)
        : AppReponseDto.buildWithErrorMessages(message);
    return res.status(statusCode).json(dto);
  }

  async create(req, res) {
    const bindingResult = ItemDto.createRequestItem(req);

    if (!_.isEmpty(bindingResult.errors)) {
      return res
        .status(409)
        .json(AppReponseDto.buildWithErrorMessages(bindingResult.errors));
    }

    const item = await Item.create({
      name: bindingResult.validatedData.name,
      description: bindingResult.validatedData.description,
      price: bindingResult.validatedData.price,
      imageUrl: bindingResult.validatedData.imageUrl,
    });

    return res.status(200).json(buildItem(item));
  }
}

module.exports = new ItemController();
