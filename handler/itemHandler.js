class ItemHandler {
  constructor(itemService, cloudService) {
    this.itemService = itemService;
    this.cloudService = cloudService;
    this.getAllItem = this.getAllItem.bind(this);
    this.getItemById = this.getItemById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.create = this.create.bind(this);
  }

  async getAllItem(req, res) {
    const serviceResponse = await this.itemService.getAllItem();
    return res.status(serviceResponse.status).send(serviceResponse);
  }

  async getItemById(req, res) {
    const id = req.params.id;
    const serviceResponse = await this.itemService.getItemById(id);
    return res.status(serviceResponse.status).send(serviceResponse);
  }

  async update(req, res) {
    const id = req.params.id;
    const payload = req.body;
    const serviceResponse = await this.itemService.update(id, payload);
    return res.status(serviceResponse.status).send(serviceResponse);
  }

  async delete(req, res) {
    const id = req.params.id;
    const serviceResponse = await this.itemService.deleteItem(id);
    return res.status(serviceResponse.status).send(serviceResponse);
  }

  async create(req, res) {
    const payload = req.body;
    const serviceResponse = await this.itemService.create(payload);
    return res.status(serviceResponse.status).send(serviceResponse);
  }

  async upload(req, res) {
    const cloudinary = await this.cloudService.uploadImage(req);
    return res
      .status(cloudinary.status)
      .send({ message: cloudinary.message, image_url: cloudinary.image_url });
  }
}

module.exports = ItemHandler;
