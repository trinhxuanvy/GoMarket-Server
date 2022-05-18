const Product = require("../models/Product");
const Category = require("../models/Category");
const Store = require("../models/Store");

exports.getProduct = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.send({
      status: 500,
      message: { err: "An error occurred" },
    });
  }
};

exports.postProduct = async (req, res, next) => {
  try {
    const store = await Store.findOne({ _id: req.body.storeId });
    const category = await Category.findOne({ _id: req.body.categoryId });

    const newProduct = new Product({
      productName: req.body.productName,
      madeIn: req.body.madeIn,
      price: req.body.price,
      outOfDate: req.body.outOfDate,
      image: req.body.image,
      unit: req.body.unit,
      storeId: req.body.storeId,
      storeName: store.storeName,
      categoryId: req.body.categoryId,
      categoryName: category.categoryName,
      isNecessary: req.body.isNecessary,
    });

    const saved = await newProduct.save();

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
