const Shipper = require('../models/Shipper');

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
