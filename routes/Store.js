const express = require('express');
const storeController = require('../controllers/Store');
const router = express.Router();

router.get(
  '/api/v1/store/unverified',
  storeController.getStoreForAuthentication,
);
router.get(`/api/v1/store/:_id`, storeController.getStoreById);
router.get(`/api/v1/store`, storeController.getAllStore);
router.post('/api/v1/store', storeController.createStore);
router.put('/api/v1/store/:_id', storeController.updateStore);
router.patch(
  '/api/v1/store/verified/:_id',
  storeController.updateStoreToVerifiedStore,
);
router.patch('/api/v1/store/block/:_id', storeController.blockStore);
module.exports = router;
