"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const restaurants = require("../public/data/restaurant.json").results;
    restaurants.forEach((restaurant) => {
      restaurant.createdAt = new Date();
      restaurant.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("restaurants", restaurants);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("restaurants", null);
  },
};
