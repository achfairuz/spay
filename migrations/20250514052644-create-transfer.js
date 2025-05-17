"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transfers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_rekening: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Rekenings",
          key: "no_rekening",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      rekening_tujuan: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Rekenings",
          key: "no_rekening",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      amount: {
        type: Sequelize.BIGINT,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    await queryInterface.dropTable("Transfers");
  },
};
