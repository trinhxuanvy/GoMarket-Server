const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Store = new Schema(
  {
    storeName: {
      type: String,
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: "",
    },
    ownerName: {
      type: String,
      default: "",
    },
    ward: { type: String, default: "" },
    district: { type: String, default: "" },
    province: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
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
