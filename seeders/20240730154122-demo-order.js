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
    return queryInterface.bulkInsert("Orders", [
      {
        itemId: 1,
        detailId: 1,
        quantity: 1,
        sales: 5000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemId: 2,
        detailId: 1,
        quantity: 1,
        sales: 7500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        itemId: 3,
        detailId: 1,
        quantity: 1,
        sales: 4500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Orders", null, {});
  },
};
