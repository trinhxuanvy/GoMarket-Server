const Shipper = require('../models/Shipper');
const Order = require('../models/Order');
const pageSize = 5;

exports.getShipperById = async (req, res, next) => {
  try {
    const shipper = await Shipper.find({ _id: req.params._id });
    res.send(shipper);
  } catch (error) {
    res.send({
      status: 500,
      message: { err: error },
    });
  }
};
exports.getShipperByStoreId = async (req, res, next) => {
  try {
    const shipper = await Shipper.find({ storeId: req.params._id });
    res.send(shipper);
  } catch (error) {
    res.send({
      status: 500,
      message: { err: error },
    });
  }
};

exports.getShipperByIdGateWay = async (req, res, next) => {
  try {
    const user = await Shipper.findById(req.data?.id);
    res.send({
      status: 200,
      data: {
        user,
      },
    });
  } catch (error) {
    res.send({
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};

exports.updateShipperById = async (req, res, next) => {
  try {
    const newUser = req.body;

    await Shipper.findByIdAndUpdate(req.data?.id, newUser);

    res.send({
      status: 200,
    });
  } catch (error) {
    res.send({
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const queryObj = req.query?.search
      ? {
          $or: [
            { status: { $regex: req.query.search, $options: 'i' } },
            { phone: { $regex: req.query.search, $options: 'i' } },
          ],
        }
      : {};

    if (req.query?.page == null) {
      req.query.page = 1;
    }

    const startItem = (req.query?.page - 1) * pageSize;
    const endItem = req.query?.page * pageSize;
    const allOrder = await Order.find(queryObj).sort({ createdAt: -1 }).exec();
    const total = allOrder.length;
    const order = allOrder.slice(startItem, endItem);

    res.send({ total, entities: order });
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: { error },
    });
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const queryObj = req.query?.search
      ? {
          $or: [
            { status: { $regex: req.query.search, $options: 'i' } },
            { phone: { $regex: req.query.search, $options: 'i' } },
          ],
        }
      : {};

    if (req.query?.page == null) {
      req.query.page = 1;
    }

    const startItem = (req.query?.page - 1) * pageSize;
    const endItem = req.query?.page * pageSize;
    const allOrder = await Order.find(queryObj).sort({ createdAt: -1 }).exec();
    const total = allOrder.length;
    const order = allOrder.slice(startItem, endItem);

    res.send({ total, entities: order });
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: { error },
    });
  }
};
