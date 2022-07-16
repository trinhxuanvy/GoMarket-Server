const express = require('express');
const orderController = require('../controllers/Order');
const authController = require('../controllers/Auth');
const router = express.Router();

router.get(`/api/v1/order/shipper/:_id`, orderController.getOrderByShiperId);
router.get(
  `/api/v1/order/store/:_id/shipping`,
  orderController.getOrderForShippingByStoreId,
);
router.patch(`/api/v1/order/:_id/status`, orderController.updateOrderStatus);
router.patch(`/api/v1/order/:_id/cancel`, orderController.cancelOrder);
router.post(`/api/v1/createorder`,authController.verifyToken, orderController.createOrder);
router.get(`/api/v1/user/orders`,authController.verifyToken, orderController.getOrderByCustomerId);

module.exports = router;
