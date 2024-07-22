const { Item } = require("../models");
class ItemRepository {
  constructor() {}

  async getAllItem() {
    const items = await Item.findAll();
    return items;
  }

  async getItemById(id) {
    return await Item.findByPk(id);
  }

  async update(id, item) {
    return await Item.update(
      {
        name: item.name,
        description: item.description,
        price: item.price,
        stock: item.stock,
        imageUrl: item.imageUrl,
      },
      { where: { id: id } }
    );
  }

  async delete(id) {
    return await Item.destroy({ where: { id: id } });
  }

  async create(item) {
    return await Item.create({
      name: item.name,
      description: item.description,
      price: item.price,
      stock: item.stock,
      imageUrl: item.imageUrl,
    });
  }
}

module.exports = ItemRepository;
