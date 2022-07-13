const express = require('express');
const orderController = require('../controllers/Order');
const router = express.Router();

router.get(`/api/v1/order/shipper/:_id`, orderController.getOrderByShiperId);
router.get(
  `/api/v1/order/store/:_id/shipping`,
  orderController.getOrderForShippingByStoreId,
);
router.patch(`/api/v1/order/:_id/status`, orderController.updateOrderStatus);
router.patch(`/api/v1/order/:_id/cancel`, orderController.cancelOrder);

module.exports = router;
