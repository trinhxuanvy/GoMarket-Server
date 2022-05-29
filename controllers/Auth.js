const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers?.authentication;
  if (bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    req.token = bearer[1];

    jwt.verify(bearer[1], "vychuoi123", (err) => {
      if (err) {
        res.send({
          status: 403,
          message: "Vui lòng đăng nhập lại",
        });
      } else {
        next();
      }
    });
  } else {
    res.send({
      status: 403,
      message: "Vui lòng đăng nhập lại",
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
        message: "Tài khoảng không tồn tại",
      });
    } else {
      if (admin.validPassword(password)) {
        const token = jwt.sign({ email, password }, "vychuoi123", {
          algorithm: "HS256",
          expiresIn: "10s",
        });

        const bearerHeader = "Bearer " + token;

        res.send({
          bearerHeader,
          status: 200,
          message: "Đăng nhập thành công",
        });
      } else {
        res.send({
          status: 404,
          message: "Sai mật khẩu",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: "Đã xảy ra lỗi",
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
            message: "Tạo tài khoảng thành công",
          });
        })
        .catch(() => {
          res.send({
            status: 500,
            message: "Đã xảy ra lỗi",
          });
        });
    } else {
      res.send({
        status: 404,
        message: "Tài khoảng đã tồn tại",
      });
    }
  } catch (error) {
    res.send({
      status: 500,
      message: "Đã xảy ra lỗi",
    });
  }
};
