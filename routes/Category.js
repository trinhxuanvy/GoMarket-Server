const express = require("express");
const categoryController = require("../controllers/Category");
const router = express.Router();

router.get("/api/v1/Category", categoryController.getCategory);
router.post("/api/v1/Category", categoryController.postCategory);

module.exports = router;
