class VerificationService {
  constructor(verificationRepository, userRepository) {
    this.verificationRepository = verificationRepository;
    this.userRepository = userRepository;
  }

  async save(user_id, mailCon) {
    const user = await this.userRepository.find_by_id(user_id);
    if (user.verified) {
      return {
        status: 200,
        message: "User Sudah terverifikasi",
      };
    }
    const token = this.generateRandomCode();
    try {
      const check = await this.verificationRepository.find(user_id);
      if (check) {
        await this.verificationRepository.delete_with_id(user_id);
        await this.verificationRepository.save(user_id, token);
      } else {
        await this.verificationRepository.save(user_id, token);
      }
      // Send email
      const userQuery = await this.userRepository.find_by_id(user_id);
      const mail = userQuery.email;
      await mailCon.sendEmail({
        from: "hanvir.dev@gmail.com",
        to: mail,
        subject: "Verifikasi Email",
        text: `Kode verifikasi anda adalah ${token}`,
        html: `<p>Kode verifikasi anda adalah ${token}</p>`,
      });
      return {
        status: 200,
        message: "Check Email Anda Untuk Mendapatkan Verifikasi Token",
      };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  async verify(user_id, token) {
    try {
      const check = await this.verificationRepository.find(user_id);
      if (check) {
        if (check.token === token) {
          await this.userRepository.verify(user_id);
          await this.verificationRepository.delete_with_id(user_id);
        } else {
          return { status: 409, message: "invalid token" };
        }
        return { status: 200, message: "User verified" };
      } else {
        return { status: 500, message: "User not found" };
      }
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  // Utility
  generateRandomCode() {
    const prefix = "BGL";
    const date = new Date();
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}${String(
      date.getMonth() + 1
    ).padStart(2, "0")}${String(date.getFullYear()).slice(-2)}`;
    const uniqueCode = this.generateUniqueCode(5);
    return `${prefix}-${formattedDate}-${uniqueCode}`;
  }

  generateUniqueCode(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }
}

module.exports = VerificationService;
