const User = require("../models/User");
const Product = require("../models/Product");

exports.getUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.send({
      status: 500,
      message: { err: "An error occurred" },
    });
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.data?.id);
    res.send({
      status: 200,
      data: {
        user,
      },
    });
  } catch (error) {
    res.send({
      status: 500,
      message: { err: "An error occurred" },
    });
  }
};

exports.updateUserById = async (req, res, next) => {
  try {
    const newUser = req.body;

    await User.findByIdAndUpdate(req.data?.id, newUser);

    res.send({
      status: 200,
    });
  } catch (error) {
    res.send({
      status: 500,
      message: { err: "An error occurred" },
    });
  }
};

exports.getCartByIdStore = async (req, res, next) => {
  try {
    const user = await User.findById(req.data.id);
    const storeId = req.query.id;
    let cart = [];
    for(let i = 0; i < user.cart.length; i++)
    {
      if(user.cart[i].storeId == storeId)
      {
        cart.push(user.cart[i]);
      }
    }
    // console.log(cart);
    res.send({cart});
  } catch (error) {
    res.send({
      status: 500,
      message: { err: "An error occurred" },
    });
  }
};

exports.postUser = async (req, res, next) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      dateOfBirth: req.body.dateOfBirth,
      identity: req.body.identity,
      userType: req.body.userType,
      avatar: req.body.avatar,
      frontIdentityCard: req.body.frontIdentityCard,
      behindIdentityCard: req.body.behindIdentityCard,
      phone: req.body.phone,
      password: req.body.password,
      ward: req.body.ward,
      district: req.body.district,
      province: req.body.province,
      address: req.body.address,
      delivery: req.body.delivery,
    });

    const saved = await newUser.save();

    if (saved) {
      res.send(saved);
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

exports.addCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.data.id);
    const product = await Product.findById(req.body.id);

    const newCardDetail = {
      storeId: product.storeId,
      productId: product._id,
      productName: product.productName,
      productImg: product.image,
      price: product.price,
      amount: 1,
    };

    const newCardStore = {
      storeId: product.storeId,
      storeName: product.storeName,
    };
    // console.log(newCardDetail);

    if (user != null) {
      var flag = false;
      var flag2 = false;
      for (let i = 0; i < user.cart.length; i++) {
        if (newCardDetail.productId.equals(user.cart[i].productId)) {
          user.cart[i].amount++;
          flag = true;
          break;
        }
      }

      for (let i = 0; i < user.cartStore.length; i++) {
        if (newCardDetail.storeId.equals(user.cartStore[i].storeId)) {
          flag2 = true;
          break;
        }
      }

      // console.log(flag);
      if (!flag) {
        user.cart.push(newCardDetail);
      }
      // console.log(flag2);
      if (!flag2) {
        user.cartStore.push(newCardStore);
      }

      let cartAmount = 0;
      for (let i = 0; i < user.cart.length; i++) {
        cartAmount += user.cart[i].amount;
      }
  
      await User.updateMany({ _id: user._id }, { cart: user.cart, cartStore: user.cartStore });

      res.send({user: JSON.stringify(user), cartAmount});
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: { error },
    });
  }
};
