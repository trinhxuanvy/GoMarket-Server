const express = require('express');
const productController = require('../controllers/Product');
const router = express.Router();

router.get(`/api/v1/products`, productController.getAllProduct);
router.get(`/api/v1/product`, productController.getProductById);
module.exports = router;
