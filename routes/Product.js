const express = require('express');
const productController = require('../controllers/Product');
const router = express.Router();

router.get(`/api/v1/product`, productController.getAllProduct);
router.get(`/api/v1/product/:_id`, productController.getProductById);
module.exports = router;
