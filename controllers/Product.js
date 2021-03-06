const Product = require("../models/Product");
const Category = require("../models/Category");
const Store = require("../models/Store");

exports.getProductById = async (req, res, next) => {
  try {
    // console.log(req.query.id);
    const product = await Product.findOne({ _id: req.query.id });
    // console.log(product);
    res.send(product);
  } catch (error) {
    res.send({
      status: 500,
      message: { error },
    });
  }
};

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

exports.getAllProduct = async (req, res, next) => {
  try {
    const queryObj = req.query?.search ? {
      $or: [
        { storeName: { $regex: req.query.search, $options: "i" } },
        { productName: { $regex: req.query.search, $options: "i" } },
      ],
    } : {};
    const allProduct = await Product.find(queryObj);
    const total = allProduct.length;
    const product = allProduct;
    // console.log(product);
    res.send({ total, product });
  } catch (error) {
    res.send({
      status: 500,
      message: { error },
    });
  }
};
