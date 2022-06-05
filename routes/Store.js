const express = require("express");
const storeController = require("../controllers/Store");
const authController = require("../controllers/Auth");
const router = express.Router();

router.get(
  "/api/v1/store/unverified",
  storeController.getStoreForAuthentication
);
router.get(`/api/v1/store/byId/:_id`, storeController.getStoreById);
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
router.post(
  "/api/v1/store/update",
  authController.verifyToken,
  storeController.updateStore
);
router.patch(
  "/api/v1/store/verified/:_id",
  storeController.updateStoreToVerifiedStore
);
router.post(
  "/api/v1/store/block/:_id",
  authController.verifyToken,
  storeController.blockStore
);
router.post(
  "/api/v1/store/verify",
  authController.verifyToken,
  storeController.verifyStore
);
router.get(
  `/api/v1/store/profile`,
  authController.verifyToken,
  storeController.getStoreProfile
);
router.get(
  `/api/v1/store/byOwnerId`,
  authController.verifyToken,
  storeController.getStoreByOwnerId
);

router.post(
  "/api/v1/store/profile/update",
  authController.verifyToken,
  storeController.updateStore
);

module.exports = router;
