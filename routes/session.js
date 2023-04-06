const express = require("express");
const router = express.Router();

const sessionController = require("../controllers/sessionController");

router.get("/create", sessionController.createSession);

module.exports = router;
