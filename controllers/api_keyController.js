const { where } = require("sequelize");
const { api_key, Rekening } = require("../models");
const { default: cryptoRandomString } = require("crypto-random-string");

const createAPI = async (req, res) => {
  const { app_name, no_rekening } = req.body;

  try {
    existing_rekening = await Rekening.findOne({
      where: {
        no_rekening: no_rekening,
      },
    });

    if (!existing_rekening) {
      return res.status(404).json({
        message: "No Rekening Not Found",
      });
    }

    api_key_kode = cryptoRandomString({ length: 12, type: "alphanumeric" });

    const new_apiKey = await api_key.create({
      api_key: api_key_kode,
      app_name: app_name,
      no_rekening: no_rekening,
    });

    res.json({
      body: new_apiKey,
      message: "API Key Created",
    });
  } catch (error) {
    console.error("APi Key Error: ", error);
    return res.status(500).json("SERVER ERROR");
  }
};

module.exports = { createAPI };
