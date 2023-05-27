const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const Sct = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const Subcategory = new mongoose.model("Subcategory", Sct);
module.exports = Subcategory;
