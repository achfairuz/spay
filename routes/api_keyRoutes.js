const express = require("express");
const router = express.Router();
const { createAPI } = require("../controllers/api_keyController");

router.post("/create/api/key", createAPI);

module.exports = router;
