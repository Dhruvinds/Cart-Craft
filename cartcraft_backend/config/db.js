const mongoose = require("mongoose");
const errLogger = require("../utils/errorLogger");

mongoose
  .connect(
    "mongodb+srv://admin:Admin123@cluster0.4b5fe.mongodb.net/CartCraft",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.log(err);

    errLogger.error(`401 ||"Failed to connect database" - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  });
