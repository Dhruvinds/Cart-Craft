const mongoose = require("mongoose");

const Mf = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    location: {
      type: String,
    },
    phone: {
      type: Number,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Manufacture = new mongoose.model("Manufacture", Mf);
module.exports = Manufacture;
