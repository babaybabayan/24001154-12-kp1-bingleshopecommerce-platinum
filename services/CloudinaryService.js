const { STATUS_UPLOAD } = require("../utils/Constants");

class CloudinaryService {
  constructor(cloudinary) {
    this.cloudinary = cloudinary;
  }

  async uploadImage(payload) {
    try {
      const fileBuffer = payload.file?.buffer.toString("base64");
      const fileString = `data:${payload.file?.mimetype};base64,${fileBuffer}`;
      const uploadedFile = await this.cloudinary.uploader.upload(fileString);
      if (uploadedFile === STATUS_UPLOAD.notDefine) {
        return { status: 500, message: uploadedFile };
      }
      return { status: 200, image_url: uploadedFile.url };
    } catch (error) {
      return { status: 500, message: error };
    }
  }
}

module.exports = CloudinaryService;
