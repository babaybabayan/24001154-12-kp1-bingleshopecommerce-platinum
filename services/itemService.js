const { buildItem } = require("../dtos/reponse/ItemResponseDto");
const ItemDto = require("../dtos/request/ItemRequestDto");
var _ = require("lodash");

class ItemService {
  constructor(itemRepository) {
    this.itemRepository = itemRepository;
  }

  async getAllItem() {
    try {
      const items = await this.itemRepository.getAllItem();
      const populateItem = items.map((item) => {
        return buildItem(item);
      });
      return { status: 200, items: populateItem };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  async getItemById(id) {
    try {
      const item = await this.itemRepository.getItemById(id);
      return { status: 200, item: buildItem(item) };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  async deleteItem(id) {
    try {
      const status = await this.itemRepository.delete(id);
      let message = status == 1 ? "Success" : "failed";
      let statusCode = status == 1 ? 201 : 400;
      return { status: statusCode, items: message };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  async update(id, item) {
    try {
      await this.itemRepository.update(id, item);
      return { status: 201, items: "Item Updated" };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  async create(item) {
    try {
      const bindingRequest = ItemDto.createRequestItem(item);
      console.log(bindingRequest);
      if (!_.isEmpty(bindingRequest.errors)) {
        return { status: 409, messages: bindingRequest.errors };
      }
      await this.itemRepository.create(bindingRequest.validatedData);
      return { status: 201, items: "Item Created" };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }
}

module.exports = ItemService;
