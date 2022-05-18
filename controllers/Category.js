const Category = require("../models/Category");

exports.getCategory = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    res.send({
      status: 500,
      message: { err: "An error occurred" },
    });
  }
};

exports.postCategory = async (req, res, next) => {
  try {
    const newCategory = new Category({
      categoryName: req.body.categoryName,
      status: 1,
    });

    const saved = await newCategory.save();

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
