const express = require("express");
const authController = require("../controllers/Auth");
const router = express.Router();

router.post("/api/v1/Auth/login", authController.postLogin);
router.post("/api/v1/Auth/register", authController.postRegister);

module.exports = router;
