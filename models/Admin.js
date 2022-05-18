const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    identity: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    frontIdentityCard: {
      type: String,
      default: "",
    },
    behindIdentityCard: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
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
    cart: {
      type: Array,
      default: [],
    },
    status: {
      type: Number,
      default: 1,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "User",
  }
);

module.exports = mongoose.model("User", User);
