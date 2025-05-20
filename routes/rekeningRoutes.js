const express = require("express");
const router = express.Router();
const {
  createRekening,
  deleteRekening,
  check_rekening,
} = require("../controllers/rekeningController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/rekening/create", authMiddleware, createRekening);
router.get("/rekening/check/:no_rekening", check_rekening);

router.delete("/rekening/delete", authMiddleware, deleteRekening);

module.exports = router;
