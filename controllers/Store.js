const Store = require('../models/Store');

exports.getStoreById = async (req, res, next) => {
  try {
    const store = await Store.find({ _id: req.params._id });
    res.send(store);
  } catch (error) {
    res.send({
      status: 500,
      message: { error },
    });
  }
};
exports.getAllStore = async (req, res, next) => {
  try {
    const store = await Store.find();
    res.send(store);
  } catch (error) {
    res.send({
      status: 500,
      message: { error },
    });
  }
};
exports.getStoreForAuthentication = async (req, res, next) => {
  try {
    const store = await Store.find({ status: 0 });
    res.send(store);
  } catch (error) {
    res.send({
      status: 500,
      message: { error },
    });
  }
};
exports.createStore = async (req, res, next) => {
  try {
    const store = new Store({
      storeName: req.body.storeName,
      owner: req.body.owner,
      ward: req.body.ward,
      district: req.body.district,
      province: req.body.province,
      address: req.body.address,
      tax: req.body.tax,
      status: req.body.status,
      rating: req.body.rating,
      certification: req.body.certification,
      businessLicense: req.body.businessLicense,
      disable: req.body.disable,
    });

    const saved = await store.save();

    res.send(store);
  } catch (error) {
    res.send({
      status: 500,
      message: { error },
    });
  }
};
exports.updateStoreToVerifiedStore = async (req, res, next) => {
  try {
    const store = await Store.findByIdAndUpdate(req.params._id, { status: 1 });
    res.send(store);
  } catch (error) {
    res.send({
      status: 500,
      message: { error },
    });
  }
};
exports.updateStore = async (req, res, next) => {
  try {
    const store = await Store.findOneAndReplace(req.params._id, {
      storeName: req.body.storeName,
      owner: req.body.owner,
      ward: req.body.ward,
      district: req.body.district,
      province: req.body.province,
      address: req.body.address,
      tax: req.body.tax,
      status: req.body.status,
      rating: req.body.rating,
      certification: req.body.certification,
      businessLicense: req.body.businessLicense,
      disable: req.body.disable,
    });
    res.send(store);
  } catch (error) {
    res.send({
      status: 500,
      message: { error },
    });
  }
};
exports.blockStore = async (req, res, next) => {
  try {
    const store = await Store.findByIdAndUpdate(req.params._id, {
      disable: true,
    });
    res.send(store);
  } catch (error) {
    res.send({
      status: 500,
      message: { error },
    });
  }
};
