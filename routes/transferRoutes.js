const express = require("express");
const router = express();
const { transfer, spayLibrary } = require("../controllers/transferController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { checkAPI } = require("../middleware/api_keyMiddleware");

router.post("/transfer", authMiddleware, transfer);

router.post("/spay/library/transfer", checkAPI, spayLibrary);

module.exports = router;
