const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const Admin = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: Date,
      default: Date.now(),
    },
    identity: {
      type: String,
      default: "",
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
      default: "",
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
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
    collection: "Admin",
  }
);

Admin.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 12);
});

Admin.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("Admin", Admin);
