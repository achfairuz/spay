"use strict";

const { sequelize } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("api_keys", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      api_key: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      app_name: {
        type: Sequelize.STRING,
      },
      no_rekening: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Rekenings",
          key: "no_rekening",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("api_keys");
  },
};
