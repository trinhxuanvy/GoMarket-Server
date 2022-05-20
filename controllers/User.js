const User = require('../models/User');

exports.getUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.send({
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};

exports.postUser = async (req, res, next) => {
  try {
    console.log(req.body);
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
        message: { err: 'An error occurred' },
      });
    }
  } catch (error) {
    res.send({
      status: 500,
      message: { err: 'An error occurred' },
    });
  }
};
