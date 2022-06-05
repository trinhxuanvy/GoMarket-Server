const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const User = new Schema(
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
    userType: {
      type: Number,
      default: 0,
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
    rating: {
      type: Number,
      default: 0,
      min: 0,
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
    delivery: [
      {
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
        setDefault: {
          type: Boolean,
          default: "",
        },
      },
    ],
    status: {
      type: Number,
      default: 1,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    isLogged: {
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

User.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 12);
});

User.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", User);
