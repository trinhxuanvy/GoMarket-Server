const Admin = require('../models/Admin');
const User = require('../models/User');
const Shipper = require('../models/Shipper');
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers?.authorization;

  if (bearerHeader !== undefined) {
    const bearer = bearerHeader.split(' ');

    jwt.verify(bearer[1], 'vychuoi123', async (err, data) => {
      if (err) {
        res.send({
          status: 403,
          message: 'Vui lòng đăng nhập lại',
        });
      } else {
        let account = {};
        if (data.typeUser === 'user') {
          account = await User.findById(data.id);
        } else {
          if (data.typeUser === 'shipper') {
            account = await Shipper.findById(data.id);
          } else {
            account = await Admin.findById(data.id);
          }
        }
        if (!account?.isLogged) {
          return res.send({
            status: 403,
            message: 'Vui lòng đăng nhập lại',
          });
        }

        req.data = data;
        next();
      }
    });
  } else {
    res.send({
      status: 403,
      message: 'Vui lòng đăng nhập lại',
    });
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin?._id) {
      res.send({
        status: 404,
        message: 'Tài khoảng không tồn tại',
      });
    } else {
      if (admin.validPassword(password)) {
        const token = jwt.sign(
          { id: admin._id, email, password },
          'vychuoi123',
          {
            algorithm: 'HS256',
            expiresIn: '10h',
          },
        );

        const bearerHeader = 'Bearer ' + token;
        await Admin.updateOne({ _id: admin._id }, { isLogged: true });

        res.send({
          bearerHeader,
          status: 200,
          message: 'Đăng nhập thành công',
        });
      } else {
        res.send({
          status: 404,
          message: 'Sai mật khẩu',
        });
      }
    }
  } catch (error) {
    res.send({
      status: 500,
      message: 'Đã xảy ra lỗi',
    });
  }
};

exports.postRegister = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin?._id) {
      Admin.create({ email, password })
        .then((user) => {
          res.send({
            user,
            status: 200,
            message: 'Tạo tài khoảng thành công',
          });
        })
        .catch(() => {
          res.send({
            status: 500,
            message: 'Đã xảy ra lỗi',
          });
        });
    } else {
      res.send({
        status: 404,
        message: 'Tài khoảng đã tồn tại',
      });
    }
  } catch (error) {
    res.send({
      status: 500,
      message: 'Đã xảy ra lỗi',
    });
  }
};

exports.postUserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user?._id) {
      res.send({
        status: 404,
        message: 'Tài khoảng không tồn tại',
      });
    } else {
      if (user.validPassword(password)) {
        const token = jwt.sign(
          { id: user._id, email, password, name: user.name, typeUser: 'user' },
          'vychuoi123',
          {
            algorithm: 'HS256',
            expiresIn: '10h',
          },
        );
        const bearerHeader = 'Bearer ' + token;
        await User.updateOne({ _id: user._id }, { isLogged: true });

        res.send({
          bearerHeader,
          status: 200,
          message: 'Đăng nhập thành công',
        });
      } else {
        res.send({
          status: 404,
          message: 'Sai mật khẩu',
        });
      }
    }
  } catch (error) {
    res.send({
      status: 500,
      message: 'Đã xảy ra lỗi',
    });
  }
};

exports.postUserRegister = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user?._id) {
      User.create({ email, password })
        .then((userData) => {
          res.send({
            userData,
            status: 200,
            message: 'Tạo tài khoảng thành công',
          });
        })
        .catch(() => {
          res.send({
            status: 500,
            message: 'Đã xảy ra lỗi',
          });
        });
    } else {
      res.send({
        status: 404,
        message: 'Tài khoảng đã tồn tại',
      });
    }
  } catch (error) {
    res.send({
      status: 500,
      message: 'Đã xảy ra lỗi',
    });
  }
};

exports.postShipperLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Shipper.findOne({ email });
    if (!user?._id) {
      res.send({
        status: 404,
        message: 'Tài khoảng không tồn tại',
      });
    } else {
      if (user.validPassword(password)) {
        const token = jwt.sign(
          {
            id: user._id,
            email,
            password,
            name: user.name,
            typeUser: 'shipper',
          },
          'vychuoi123',
          {
            algorithm: 'HS256',
            expiresIn: '10h',
          },
        );
        const bearerHeader = 'Bearer ' + token;
        await Shipper.updateOne({ _id: user._id }, { isLogged: true });

        res.send({
          bearerHeader,
          status: 200,
          message: 'Đăng nhập thành công',
        });
      } else {
        res.send({
          status: 404,
          message: 'Sai mật khẩu',
        });
      }
    }
  } catch (error) {
    res.send({
      status: 500,
      message: 'Đã xảy ra lỗi',
    });
  }
};

exports.postShipperRegister = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Shipper.findOne({ email });
    if (!user?._id) {
      Shipper.create({ email, password })
        .then((userData) => {
          res.send({
            userData,
            status: 200,
            message: 'Tạo tài khoảng thành công',
          });
        })
        .catch((err) => {
          console.log(err);
          res.send({
            status: 500,
            message: 'Đã xảy ra lỗi',
          });
        });
    } else {
      res.send({
        status: 404,
        message: 'Tài khoảng đã tồn tại',
      });
    }
  } catch (error) {
    res.send({
      status: 500,
      message: 'Đã xảy ra lỗi',
    });
  }
};

exports.logout = async (req, res, next) => {
  try {
    await Admin.updateOne({ _id: req.data?.id }, { isLogged: false });

    res.send({
      status: 200,
    });
  } catch (error) {
    res.send({
      status: 500,
      message: 'Đã xảy ra lỗi',
    });
  }
};

exports.userLogout = async (req, res, next) => {
  try {
    await User.updateOne({ _id: req.data?.id }, { isLogged: false });

    res.send({
      status: 200,
    });
  } catch (error) {
    res.send({
      status: 500,
      message: 'Đã xảy ra lỗi',
    });
  }
};

exports.shipperLogout = async (req, res, next) => {
  try {
    await Shipper.updateOne({ _id: req.data?.id }, { isLogged: false });

    res.send({
      status: 200,
    });
  } catch (error) {
    res.send({
      status: 500,
      message: 'Đã xảy ra lỗi',
    });
  }
};
