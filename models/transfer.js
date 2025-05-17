"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transfer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transfer.init(
    {
      id_rekening: DataTypes.STRING,
      rekening_tujuan: DataTypes.STRING,
      amount: DataTypes.BIGINT,
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Transfer",
      tableName: "Transfers",
    }
  );
  return Transfer;
};
