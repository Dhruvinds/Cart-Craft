const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const Pd = mongoose.Schema(
  {
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subcategory: {
      type: ObjectId,
      ref: "Subcategory",
    },
    manufacture: {
      type: ObjectId,
      ref: "Manufacture",
    },
    productname: {
      type: String,
    },
    description: {
      type: String,
    },
    model: {
      type: String,
    },
    upc: {
      type: Number,
    },
    location: {
      type: String,
    },
    prize: {
      type: Number,
    },
    qty: {
      type: Number,
    },
    status: {
      type: String,
    },
    image: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Product = new mongoose.model("Product", Pd);
module.exports = Product;
