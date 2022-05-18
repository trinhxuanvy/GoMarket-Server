const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category = new Schema(
  {
    categoryName: { type: String, required: true },
    storeId: { type: Schema.Types.ObjectId, ref: "Store", required: true },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "Category",
  }
);

module.exports = mongoose.model("Category", Category);
