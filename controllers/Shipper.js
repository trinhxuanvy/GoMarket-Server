const Shipper = require('../models/Shipper');
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
    console.log(req.data);
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
