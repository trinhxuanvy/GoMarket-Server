const express = require("express");
const storeController = require("../controllers/Store");
const authController = require("../controllers/Auth");
const router = express.Router();

router.get(
  "/api/v1/store/unverified",
  storeController.getStoreForAuthentication
);
router.get(`/api/v1/store/:_id`, storeController.getStoreById);
router.get(
  `/api/v1/store`,
  authController.verifyToken,
  storeController.getAllStore
);
router.post(
  "/api/v1/store",
  authController.verifyToken,
  storeController.createStore
);
router.patch("/api/v1/store/:_id", storeController.updateStore);
router.patch(
  "/api/v1/store/verified/:_id",
  storeController.updateStoreToVerifiedStore
);
router.patch(
  "/api/v1/store/block/:_id",
  authController.verifyToken,
  storeController.blockStore
);
router.patch(
  "/api/v1/store/verify",
  authController.verifyToken,
  storeController.verifyStore
);

module.exports = router;
