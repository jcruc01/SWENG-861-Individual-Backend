const express = require("express");
const router = express.Router();
const { authenticateLogin } = require("../controllers/loginController");
// POST route for login
router.post("/", authenticateLogin);

module.exports = router;
