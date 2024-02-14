"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      "UPDATE `alphacamp`.`restaurants` SET `name` = 'name' WHERE ((`name` IS NULL) OR (`name` = ''));"
    );
    await queryInterface.changeColumn("restaurants", "name", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("restaurants", "name", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
