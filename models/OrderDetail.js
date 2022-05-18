const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderDetail = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      min: 1,
    },
    response: {
      type: String,
      default: "",
    },
    rating: {
      type: String,
      default: "",
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "OrderDetail",
  }
);

module.exports = mongoose.model("OrderDetail", OrderDetail);
