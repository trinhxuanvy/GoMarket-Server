const Store = require("../models/Store");
const jwt = require("jsonwebtoken");
const pageSize = 2;

exports.getStoreById = async (req, res, next) => {
  try {
    const store = await Store.findOne({ _id: req.params._id });
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
    const queryObj = req.query?.search
      ? {
          $or: [
            { storeName: { $regex: req.query.search, $options: "i" } },
            { ownerName: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    const startItem = (req.query.page - 1) * pageSize;
    const endItem = req.query.page * pageSize;
    const allStore = await Store.find(queryObj).sort({ createdAt: -1 }).exec();
    const total = allStore.length;
    const store = allStore.slice(startItem, endItem);
    res.send({ total, store });
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
    const store = {
      storeName: req.body.storeName,
      owner: req.data.id,
      ownerName: req.data.name,
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
    };

    Store.create(store)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    res.send(store);
  } catch (error) {
    console.log(error);
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
  console.log(req.body);
  try {
    const store = await Store.findByIdAndUpdate(req.body?.id, {
      storeName: req.body?.storeName,
      ward: req.body?.ward,
      district: req.body?.district,
      province: req.body?.province,
      address: req.body?.address,
      tax: req.body?.tax,
      certification: req.body?.certification,
      businessLicense: req.body?.businessLicense,
      logo: req.body?.logo,
      backgroundLogo: req.body?.backgroundLogo,
    });
    res.send({ status: 200 });
  } catch (error) {
    res.send({
      status: 500,
      message: { error },
    });
  }
};
exports.blockStore = async (req, res, next) => {
  try {
    const store = await Store.findById(req.params._id);

    if (store?._id) {
      await Store.updateOne(
        { _id: req.params._id },
        { disable: !store?.disable }
      );
      res.send(store);
    } else {
      res.send({
        status: 500,
        message: { error },
      });
    }
  } catch (error) {
    res.send({
      status: 500,
      message: { error },
    });
  }
};
exports.verifyStore = async (req, res, next) => {
  try {
    let store = await Store.findByIdAndUpdate(req.body.id, {
      status: 1,
    });
    store.status = 1;
    res.send(store);
  } catch (error) {
    res.send({
      status: 500,
      message: { error },
    });
  }
};
exports.getStoreProfile = async (req, res, next) => {
  try {
    const store = await Store.findOne({
      _id: req.query?.id,
      owner: req.data?.id,
    });

    res.send({
      status: 200,
      data: {
        total: store.length,
        entities: store,
      },
    });
  } catch (error) {
    res.send({
      status: 500,
      message: { error },
    });
  }
};

exports.getStoreByOwnerId = async (req, res, next) => {
  try {
    const store = await Store.find({ owner: req?.data?.id });

    res.send({
      status: 200,
      data: {
        total: store.length,
        entities: store,
      },
    });
  } catch (error) {
    res.send({
      status: 500,
      message: { error },
    });
  }
};
