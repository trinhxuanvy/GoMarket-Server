const express = require('express');
const authController = require('../controllers/Auth');
const router = express.Router();

router.post('/api/v1/Auth/Shipper/login', authController.postShipperLogin);
router.post(
  '/api/v1/Auth/Shipper/register',
  authController.postShipperRegister,
);
router.get(
  '/api/v1/Auth/Shipper/logout',
  authController.verifyToken,
  authController.shipperLogout,
);
module.exports = router;
