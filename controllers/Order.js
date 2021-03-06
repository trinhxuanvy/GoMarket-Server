const Order = require("../models/Order");
const User = require("../models/User");
const { getNextOrderStatus } = require("../utils");

exports.getOrderByShiperId = async (req, res, next) => {
  try {
    const order = await Order.find({ shipperId: req.params._id });
    res.send(order);
  } catch (error) {
    res.send({
      status: 500,
      message: { err: "An error occurred" },
    });
  }
};

exports.getOrderByCustomerId = async (req, res, next) => {
  try {
    const order = await Order.find({ customerId: req.data.id });
    console.log(req.data.id);
    console.log(order);
    res.send(order);
  } catch (error) {
    res.send({
      status: 500,
      message: { err: "An error occurred" },
    });
  }
};

exports.getOrderDetailsByOrderId = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id );
    console.log(req.params.id, 'check');
    console.log(order.orderDetails);
    res.send(order.orderDetails);
  } catch (error) {
    res.send({
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};

exports.updateRatingOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.body.id);
    const star = req.body.star;

    order.rating = star;
    
    const result = await Order.updateOne({ _id: order._id }, order);

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
    const status = req?.query?.status != null ? req?.query?.status : "";
    var order = await Order.find({
      $or: [
        {
          status: "Open",
          storeId: req.params._id,
        },
        {
          shipperId: req.params?.shipperId,
        },
      ],
      $or: [
        { status: { $regex: req.query.search, $options: "i" } },
        { paymentMethod: { $regex: req.query.search, $options: "i" } },
      ],
    });

    var result = [];
    for (let i = 0; i < order.length; i++) {
      const cus = await User.findOne({ _id: order[i].customerId });
      var obj = { ...order[i]._doc, customerName: cus.name };
      result.push(obj);
    }
    res.send(result);
  } catch (error) {
    res.send({
      status: 500,
      message: { err: "An error occurred" },
    });
  }
};
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params._id);
    if (order.olderStatus == "") {
      order.olderStatus = order.status;
    } else {
      order.olderStatus = `${order.olderStatus} -> ${order.status}`;
    }
    if (order.status == "Open") {
      order.shipperId = req.body?.shipperId;
    }

    order.status = getNextOrderStatus(order.status);

    const result = await Order.updateOne({ _id: order._id }, order);
    res.send(order);
  } catch (error) {
    res.send({
      status: 500,
      message: { err: "An error occurred" },
    });
  }
};
exports.cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params._id);

    order.olderStatus = `${order.olderStatus} -> ${order.status}`;

    order.status = "Cancelled";
    const result = await Order.updateOne({ _id: order._id }, order);

    res.send(order);
  } catch (error) {
    res.send({
      status: 500,
      message: { err: "An error occurred" },
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
    for (let i = 0; i < user.cart.length; i++) {
      if (user.cart[i].storeId == storeId) {
        cart.push(user.cart[i]);
      } else {
        newcart.push(user.cart[i]);
      }
    }

    for (let i = 0; i < user.cartStore.length; i++) {
      if (user.cartStore[i].storeId != storeId) {
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
      orderDetails: cart,
    });

    console.log(newOrder);

    const saved = await newOrder.save();

    if (saved) {
      user.cart = newcart;
      user.cartStore = newcartstore;
      console.log(user);
      await User.updateMany(
        { _id: user._id },
        { $pull: { cartStore: { storeId: storeId } }, cart: newcart }
      );
      let cartAmount = 0;
      for (let i = 0; i < user.cart.length; i++) {
        cartAmount += user.cart[i].amount;
      }
      res.send({ user: JSON.stringify(user), cartAmount });
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

exports.getOrderByStoreId = async (req, res, next) => {
  try {
    const orders = await Order.find({ storeId: req.params.id });
    const customer = await User.find();

    const newOrders = orders.map((o) => {
      const cusF = customer.find((c) => c.id == o.customerId);

      return {
        ...o._doc,
        customerName: cusF.name,
      };
    });

    res.send({
      status: 200,
      data: {
        total: newOrders.length,
        entities: newOrders,
      },
    });
  } catch (error) {
    res.send({
      status: 500,
      message: { err: "An error occurred" },
    });
  }
};

exports.getOrderDetailByOrderId = async (req, res, next) => {
  try {
    const orders = await Order.findById(req.params.id);
    res.send({
      status: 200,
      data: {
        total: orders.orderDetails.length,
        entities: orders.orderDetails,
      },
    });
  } catch (error) {
    res.send({
      status: 500,
      message: { err: "An error occurred" },
    });
  }
};
