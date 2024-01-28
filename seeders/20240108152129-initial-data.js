"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const hash = await bcrypt.hash("12345678", 10);
      await queryInterface.bulkInsert(
        "users",
        [
          {
            id: 1,
            name: "第1位使用者",
            email: "user1@example.com",
            password: hash,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            name: "第2位使用者",
            email: "user2@example.com",
            password: hash,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 3,
            name: "第3位使用者",
            email: "user3@example.com",
            password: hash,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {
          transaction,
        }
      );
      const restaurants = require("../public/data/restaurant.json").results;
      restaurants.forEach((restaurant) => {
        switch (restaurant.id) {
          case 1:
          case 2:
          case 3:
            restaurant.userId = 1;
            break;
          case 4:
          case 5:
          case 6:
            restaurant.userId = 2;
            break;
          default:
            restaurant.userId = 3;
            break;
        }
        restaurant.createdAt = new Date();
        restaurant.updatedAt = new Date();
      });
      await queryInterface.bulkInsert("restaurants", restaurants, {
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      console.log(`執行 seeder 失敗, error: ${error}`);
      await transaction.rollback();
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null);
  },
};
