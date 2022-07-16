const Order = require('../models/Order');
const User = require("../models/User");
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

exports.getOrderByCustomerId = async (req, res, next) => {
  try {
    const order = await Order.find( {customerId: req.data.id});
    console.log(req.data.id);
    console.log(order);
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
    console.log(req.params._id);
    const order = await Order.find({
      storeId: req.params._id,
    });
    console.log(order);
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

exports.createOrder = async (req, res, next) => {
  try {
    const user = await User.findById(req.data.id);
    const storeId = req.body.id;
    let cart = [];
    let newcart = [];
    let newcartstore = [];
    for(let i = 0; i < user.cart.length; i++)
    {
      if(user.cart[i].storeId == storeId)
      {
        cart.push(user.cart[i]);
      }
      else
      {
        newcart.push(user.cart[i]);
      }
    }

    for(let i = 0; i < user.cartStore.length; i++)
    {
      if(user.cartStore[i].storeId != storeId)
      {
        newcartstore.push(user.cartStore[i]);
      }
    }
    const newOrder = new Order({
      customerId: req.data.id,
      storeId: req.body.id,
      subTotal: req.body.subTotal,
      total: req.body.total,
      phone: req.body.phone,
      deliveryAddress: {
        ward: req.body.ward,
        district: req.body.district,
        province: req.body.province,
        address: req.body.address,
      },
      orderDetails: cart
    });

    console.log(newOrder);

    const saved = await newOrder.save();

    if (saved) {
      user.cart = newcart;
      user.cartStore = newcartstore;
      console.log(user);
      await User.updateMany({ _id: user._id }, {$pull: { cartStore: {storeId: storeId} },  cart: newcart})
      let cartAmount = 0;
      for (let i = 0; i < user.cart.length; i++) {
        cartAmount += user.cart[i].amount;
      }
      res.send({user: JSON.stringify(user), cartAmount});
    } else {
      res.send({
        status: 500,
        message: { err: "An error occurred" },
      });
    }
  } catch (error) {
    res.send({
      status: 500,
      message: { err: "An error occurred" },
    });
  }
};
