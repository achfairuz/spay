const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");
require("dotenv").config();

const register = async (req, res) => {
  const { username, name, address, phone_number, password } = req.body;

  const existing_user = await User.findOne({ where: { username: username } });
  if (existing_user) {
    return res.status(400).json({ message: "username already exists" });
  }

  if (!username || !name || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const hash_pass = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      username,
      name,
      address,
      phone_number,
      password: hash_pass,
    });

    res.json(user);
  } catch (error) {
    console.error("Gagal menambahkan user:", error.message);
    console.error("Detail error:", error); // Cetak lebih detail
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await User.findOne({ where: { username } });
    if (!username) {
      return res.status(401).json({ message: "Username Invalid" });
    }

    const check_pass = await bcrypt.compare(password, user.password);
    if (!check_pass) {
      return res.status(401).json({ message: "Password Is Wrong" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ body: user, token: token });
  } catch (error) {
    console.log("Login error", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login };
