const Order = require('../models/Order');
const { getNextOrderStatus } = require('../utils');

exports.getOrderByShiperId = async (req, res, next) => {
  try {
    const order = await Order.find({ shipperId: req.params._id });
    res.send(order);
  } catch (error) {
    res.send({
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};
exports.getOrderForShippingByStoreId = async (req, res, next) => {
  try {
    const order = await Order.find({
      storeId: req.params._id,
      status: 'Confirmed',
    });
    res.send(order);
  } catch (error) {
    res.send({
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params._id);
    if (order.olderStatus == '') {
      order.olderStatus = order.status;
    } else {
      order.olderStatus = `${order.olderStatus} -> ${order.status}`;
    }
    order.status = getNextOrderStatus(order.status);
    res.send(order);
  } catch (error) {
    res.send({
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};
exports.cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params._id);

    order.olderStatus = `${order.olderStatus} -> ${order.status}`;

    order.status = 'Cancelled';
    res.send(order);
  } catch (error) {
    res.send({
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};
