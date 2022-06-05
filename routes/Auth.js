const express = require("express");
const authController = require("../controllers/Auth");
const router = express.Router();

router.post("/api/v1/Auth/login", authController.postLogin);
router.post("/api/v1/Auth/register", authController.postRegister);
router.post("/api/v1/Auth/user/login", authController.postUserLogin);
router.post("/api/v1/Auth/user/register", authController.postUserRegister);
router.get(
  "/api/v1/Auth/logout",
  authController.verifyToken,
  authController.logout
);
router.get(
  "/api/v1/Auth/user/logout",
  authController.verifyToken,
  authController.userLogout
);

module.exports = router;
