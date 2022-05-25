const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Store = new Schema(
  {
    storeName: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
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
    tax: {
      type: String,
      default: "",
    },
    status: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
    },
    certification: {
      type: String,
      default: "",
    },
    businessLicense: {
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
    collection: "Store",
  }
);

module.exports = mongoose.model("Store", Store);
