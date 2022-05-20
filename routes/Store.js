const express = require('express');
const storeController = require('../controllers/Store');
const router = express.Router();

router.get(`/api/v1/store/:_id`, storeController.getStoreById);
router.get(
  '/api/v1/store/unverified',
  storeController.getStoreForAuthentication,
);
router.post('/api/v1/store', storeController.createStore);
router.patch(
  '/api/v1/store/verified/:_id',
  storeController.updateStoreToVerifiedStore,
);
module.exports = router;
