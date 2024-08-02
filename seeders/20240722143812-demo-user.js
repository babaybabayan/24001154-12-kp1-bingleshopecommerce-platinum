"use strict";
const crypto = require("crypto");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert(
      "users",
      [
        {
          username: "akbar",
          email: "akbar@binar.com",
          password: crypto.createHash("md5").update("binar123").digest("hex"),
          role: "Admin",
          verified: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "hanvir",
          email: "hanvir@binar.com",
          password: crypto.createHash("md5").update("binar123").digest("hex"),
          role: "User",
          verified: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "adit",
          email: "aditya@binar.com",
          password: crypto.createHash("md5").update("binar123").digest("hex"),
          role: "Admin",
          verified: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "vieri",
          email: "vieri@binar.com",
          password: crypto.createHash("md5").update("binar123").digest("hex"),
          role: "User",
          verified: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("users", null, {});
  },
};
