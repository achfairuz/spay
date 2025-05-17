const { where } = require("sequelize");
const { Transfer, User, Rekening } = require("../models");

const transfer = async (req, res) => {
  const { rekening_tujuan, amount, description } = req.body;

  try {
    const rekening_pengirim = await Rekening.findOne({
      where: { user_id: req.user.id },
    });
    const exist_rekening_penerima = await Rekening.findOne({
      where: { no_rekening: rekening_tujuan },
    });
    if (!rekening_pengirim) {
      return res.status(404).json({
        message:
          "Rekening anda tidak ditemukan, silahkan daftar rekening terlebih dahulu",
      });
    }
    if (!exist_rekening_penerima) {
      return res.status(404).json({ message: "No Rekening Not Found" });
    }
    if (rekening_pengirim.no_rekening == exist_rekening_penerima.no_rekening) {
      return res
        .status(400)
        .json({ message: "Tidak bisa tranfer ke rekening sendiri" });
    }

    if (rekening_pengirim.saldo < amount) {
      return res.status(400).json({ message: "Saldo anda tidak mencukupi!" });
    }
    const saldo_pengirim = Number(rekening_pengirim.saldo) - amount;
    const saldo_penerima = Number(exist_rekening_penerima.saldo) + amount;

    const new_transfer = await Transfer.create({
      id_rekening: rekening_pengirim.no_rekening,
      rekening_tujuan: rekening_tujuan,
      amount: amount,
      description: description,
    });

    const update_saldo_pengirim = await Rekening.update(
      { saldo: saldo_pengirim },
      { where: { no_rekening: rekening_pengirim.no_rekening } }
    );

    const update_saldo_penerima = await Rekening.update(
      { saldo: saldo_penerima },
      { where: { no_rekening: exist_rekening_penerima.no_rekening } }
    );

    return res.json({
      body: new_transfer,
      message: "Transfer successfull",
    });
  } catch (error) {
    console.error("Error transfer: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

const spayLibrary = async (req, res) => {
  const { no_rekening } = req.apiUser;
  const { your_rekening, amount, description } = req.body;
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ message: "Jumlah transfer tidak valid" });
  }

  try {
    const existing_rekening = await Rekening.findOne({
      where: {
        no_rekening: your_rekening,
      },
    });
    const rekening_penerima = await Rekening.findOne({
      where: {
        no_rekening: no_rekening,
      },
    });
    if (!existing_rekening) {
      return res.status(404).json({ message: "Rekening   Not found" });
    }
    if (!rekening_penerima) {
      return res.status(404).json({ message: "Rekening   Not found" });
    }
    if (existing_rekening.no_rekening == rekening_penerima.no_rekening) {
      return res
        .status(400)
        .json({ message: "Tidak bisa tranfer ke rekening sendiri" });
    }
    if (existing_rekening.saldo < amount) {
      return res.status(400).json({ message: "Saldo anda tidak mencukupi!" });
    }
    console.log("SALDO PENERIMA = ", rekening_penerima.saldo);

    const saldo_pengirim = Number(existing_rekening.saldo) - amount;
    const saldo_penerima = Number(rekening_penerima.saldo) + amount;

    const new_transfer = await Transfer.create({
      id_rekening: your_rekening,
      rekening_tujuan: no_rekening,
      amount: amount,
      description: description,
    });

    const update_saldo_pengirim = await Rekening.update(
      { saldo: saldo_pengirim },
      { where: { no_rekening: your_rekening } }
    );

    const update_saldo_penerima = await Rekening.update(
      { saldo: saldo_penerima },
      { where: { no_rekening: no_rekening } }
    );

    res.json({
      body: new_transfer,
      message: "Transfer successfull",
    });
  } catch (error) {
    console.error("Error Transfer: ", error);
    return res.status(500).json({ message: "SERVER ERROR" });
  }
};
module.exports = { transfer, spayLibrary };
