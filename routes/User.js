const express = require("express");
const userController = require("../controllers/User");
const authController = require("../controllers/Auth");
const router = express.Router();

router.get("/api/v1/User", userController.getUser);
router.post("/api/v1/User", userController.postUser);
router.get(
  "/api/v1/User/byId",
  authController.verifyToken,
  userController.getUserById
);
router.post(
  "/api/v1/User/byId/update",
  authController.verifyToken,
  userController.updateUserById
);

module.exports = router;
