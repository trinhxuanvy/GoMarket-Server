const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    madeIn: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    outOfDate: {
      type: Date,
      default: null,
    },
    image: {
      type: String,
      default: "",
    },
    unit: { type: String, default: "Kg" },
    storeId: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    storeName: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    categoryName: { type: String, required: true },
    isNecessary: { type: Boolean, default: true },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "Product",
  }
);

module.exports = mongoose.model("Product", Product);
