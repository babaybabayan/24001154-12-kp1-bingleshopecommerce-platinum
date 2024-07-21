"use strict";

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
      "Items",
      [
        {
          name: "Item 1",
          description: "Description 1",
          price: 1000000,
          imageUrl: "url 1",
          stock: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Item 2",
          description: "Description 2",
          price: 2000000,
          imageUrl: "url 2",
          stock: 5,
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
    return queryInterface.bulkDelete("Items", null, {});
  },
};
