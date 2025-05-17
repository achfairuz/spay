const express = require("express");
const router = express.Router();
const {
  createRekening,
  deleteRekening,
} = require("../controllers/rekeningController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/rekening/create", authMiddleware, createRekening);
router.delete("/rekening/delete", authMiddleware, deleteRekening);

module.exports = router;
