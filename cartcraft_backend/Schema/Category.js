const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const Ct = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
    },
    subcategory: [
      {
        type: ObjectId,
        ref: "Subcategory",
      },
    ],
  },
  { timestamps: true }
);

const Category = new mongoose.model("Category", Ct);
module.exports = Category;
