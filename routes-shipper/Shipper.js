const express = require('express');
const shipperController = require('../controllers/Shipper');
const authController = require('../controllers/Auth');
const router = express.Router();

router.get(`/api/v1/shipper/store/:_id`, shipperController.getShipperByStoreId);
router.get(
  '/api/v1/shipper/byId',
  authController.verifyToken,
  shipperController.getShipperByIdGateWay,
);
router.get(`/api/v1/shipper/detail/:_id`, shipperController.getShipperById);
router.post(
  '/api/v1/shipper/byId/update',
  authController.verifyToken,
  shipperController.updateShipperById,
);

module.exports = router;
