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

router.post(
    "/api/v1/User/addcart",
    authController.verifyToken,
    userController.addCart
);
router.get("/api/v1/cartbyidstore",authController.verifyToken, userController.getCartByIdStore);
module.exports = router;
