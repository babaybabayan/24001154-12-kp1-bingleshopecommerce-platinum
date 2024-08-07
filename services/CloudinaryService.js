class CloudinaryService {
  constructor(cloudinary) {
    this.cloudinary = cloudinary;
  }

  async uploadImage(payload) {
    try {
      const fileBuffer = payload.file?.buffer.toString("base64");
      const fileString = `data:${payload.file?.mimetype};base64,${fileBuffer}`;

      const uploadedFile = await cloudinary.uploader.upload(fileString);

      return uploadedFile.secure_url;
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = CloudinaryService;
