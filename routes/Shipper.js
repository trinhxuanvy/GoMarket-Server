const express = require('express');
const shipperController = require('../controllers/Shipper');
const router = express.Router();

router.get(`/api/v1/shipper/store/:_id`, shipperController.getShipperByStoreId);
router.get(`/api/v1/shipper/:_id`, shipperController.getShipperById);
module.exports = router;
