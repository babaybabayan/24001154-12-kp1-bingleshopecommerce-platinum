const { buildItem } = require("../dtos/reponse/ItemResponseDto");

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
}

module.exports = ItemService;
