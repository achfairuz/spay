const { where } = require("sequelize");
const { Rekening } = require("../models");

const createRekening = async (req, res) => {
  const { saldo, no_rekening } = req.body;

  const id_user = req.user.id;
  if (!/^\d{12}$/.test(no_rekening)) {
    return res
      .status(400)
      .json({ message: "Nomor rekening harus 12 digit angka" });
  }
  if (isNaN(saldo)) {
    return res.status(400).json({ message: "Saldo harus berupa angka" });
  }

  try {
    const existing_user = await Rekening.findOne({
      where: { user_id: id_user },
    });
    if (existing_user) {
      return res.status(400).json({ message: "User have a account" });
    }

    const existing_rekening = await Rekening.findOne({
      where: { no_rekening: String(no_rekening) },
    });
    if (existing_rekening) {
      return res.status(400).json({ message: "No Rekenig is already" });
    }

    const new_rekening = await Rekening.create({
      user_id: id_user,
      no_rekening: String(no_rekening),
      saldo: saldo,
    });

    res
      .status(201)
      .json({ body: new_rekening, message: "Rekening Created Successfull" });
  } catch (error) {
    console.error("Create Rekening error", error);
    res.status(500).json({ message: "Server error" });
  }
};

const check_rekening = async (req, res) => {
  const { no_rekening } = req.body;
  try {
    const exist_rekening = await Rekening.findOne({
      where: { no_rekening: no_rekening },
    });
    if (!exist_rekening) {
      return res.status(404).json({ message: "Rekening not found" });
    }
    res.status(200).json({
      data: exist_rekening.no_rekening,
      message: "Rekening ditemukan",
    });
  } catch (error) {
    console.error("Check rekening error: ", error);
    return res.status(500).json({ message: "SERVER ERROR" });
  }
};

const deleteRekening = async (req, res) => {
  const { no_rekening } = req.body;
  try {
    const exist_rekening = await Rekening.findOne({
      where: { no_rekening: no_rekening },
    });

    if (!exist_rekening) {
      return res.status(404).json({ message: "No Rekening Not Found" });
    }
    if (exist_rekening.saldo > 0) {
      return res.status(400).json({
        message:
          "Saldo anda masih ada, dilahkan pindahkan saldo terlebih dahulu!",
      });
    }

    await Rekening.destroy({
      where: { no_rekening },
    });
    res.status(200).json({ message: "rekening berhasil dihapus" });
  } catch (error) {
    console.error("Create Rekening error", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createRekening, deleteRekening, check_rekening };
