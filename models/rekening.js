"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rekening extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rekening.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
      },
      no_rekening: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: false,
      },
      saldo: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Rekening",
      tableName: "Rekenings",
    }
  );
  return Rekening;
};
