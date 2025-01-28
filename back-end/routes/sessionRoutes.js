const express = require("express");
const sessionController = require("../controllers/sessionController");

const router = express.Router();

router.get("/check", sessionController.checkSession);

module.exports = router;
