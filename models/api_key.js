"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class api_key extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  api_key.init(
    {
      api_key: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      app_name: DataTypes.STRING,
      no_rekening: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "api_key",
      tableName: "api_keys",
    }
  );
  return api_key;
};
