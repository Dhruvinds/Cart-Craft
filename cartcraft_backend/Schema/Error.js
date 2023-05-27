const mongoose = require("mongoose");

const er = mongoose.Schema(
  {
    username: {
      type: String,
    },
    error: {
      type: String,
    },
   },
  { timestamps: true }
);

const error = new mongoose.model("error", er);
module.exports = error;
