const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderDelivery = new Schema(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    shipperId: { type: Schema.Types.ObjectId, ref: "Shipper", required: true },
    deliveryFee: {
      type: Number,
      default: 0,
    },
    deliveryFeeOfShipper: {
      type: Number,
      default: 0,
    },
    subTotal: { type: Number, min: 0, required: true },
    total: { type: Number, min: 0, required: true },
    phone: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      ward: { type: String, required: true },
      district: { type: String, required: true },
      province: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      _id: false,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "OrderDelivery",
  }
);

module.exports = mongoose.model("OrderDelivery", OrderDelivery);
