const mongoose = require("mongoose");


const lg = mongoose.Schema(
    {
        username:{
            type:String,
        },
        activity:{
            type:String,
        },
         
    },
    { timestamps: true }
);

const log = new mongoose.model("log", lg);
module.exports = log;
