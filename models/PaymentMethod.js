const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentMethod = new Schema(
  {
    PaymentMethodName: { type: String, required: true },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "PaymentMethod",
  }
);

module.exports = mongoose.model("PaymentMethod", PaymentMethod);
