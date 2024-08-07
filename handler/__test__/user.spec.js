const request = require('supertest');
const crypto = require("crypto");
const app = require('../app');
const UserRepository = require("../repository/userRepository");

describe('register', () => {
    let server;
    const PORT = 3000;

    const userRepository = new UserRepository();
    const userToRegister = {
        username: "akbar",
        email: "akbar@binar.com",
        password: crypto.createHash("md5").update("binar123").digest("hex"),
        role: "Admin",
        verified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    beforeEach(() => {
        server = app.listen(PORT, function () {
            console.log(`Server berjalan pada http://localhost:${PORT}`);
        });
    });

    afterEach(async () => {
        // Cleanup data
        await userRepository.delete_by_email(userToRegister.email);
        server.close()
    });

    // Positive case
    it('success: should response with 200', async () => {
        return request(app)
        .post('/api/users/register')
        .set('Content-type', 'application/json')
        .send(userToRegister)
        .then(async (res) => {
            expect(res.status).toEqual(200);
            expect(res.message).toEqual("Berhasil");
        });
    });

    // Negative case
    it('success: should response with 500', async () => {
        const userToRegister = {
            username: "akbar",
            email: "akbar@binar.com",
            password: crypto.createHash("md5").update("binar123").digest("hex"),
            role: "Admin",
            verified: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        // Create duplicate data
        await userRepository.save(userToRegister);

        return request(app)
        .post('/api/users/register')
        .set('Content-type', 'application/json')
        .set('Authorization', 'Bearer + token')
        .send(userToRegister)
        .then(async (res) => {
            expect(res.statusCode).toEqual(500);
        });
    });
});