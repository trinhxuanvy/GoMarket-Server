const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    disable: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "Comment",
  }
);

module.exports = mongoose.model("Comment", Comment);
