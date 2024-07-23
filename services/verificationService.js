class VerificationService{
    constructor(verificationRepository){
        this.verificationRepository = verificationRepository;
    }

    async save(user_id){
        const token = this.generateRandomCode();
        try {
            await this.verificationRepository.save(user_id, token);
            return { status: 200, message: "Berhasil" };
        } catch (error) {
            return { status: 500, message: error.message };
        }
    }

    // Utility
    generateRandomCode() {
        const prefix = 'BGL';
        const date = new Date();
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getFullYear()).slice(-2)}`;
        const uniqueCode = this.generateUniqueCode(5);
        return `${prefix}-${formattedDate}-${uniqueCode}`;
    }

    generateUniqueCode(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }
        return result;
    }
}

module.exports = VerificationService