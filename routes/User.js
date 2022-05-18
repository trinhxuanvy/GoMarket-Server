const express = require("express");
const userController = require("../controllers/User");
const router = express.Router();

router.get("/api/v1/User", userController.getUser);
router.post("/api/v1/User", userController.postUser);

module.exports = router;
