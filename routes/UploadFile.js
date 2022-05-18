const express = require("express");
const multer = require("multer");
const uploadFileController = require("../services/firebase");
const router = express.Router();
const Multer = multer({
  storage: multer.memoryStorage(),
  limits: 1024 * 1024,
});

router.post(
  "/api/v1/UploadFile",
  Multer.single(),
  uploadFileController.uploadImage
);

module.exports = router;
