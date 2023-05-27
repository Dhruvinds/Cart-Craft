const jwt = require("jsonwebtoken");
const User = require("../Schema/UserSchema");
const errLogger = require("../utils/errorLogger");

const protected = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, "HimanshuRupavatiya");
      user = await User.findById(decode.id);
      next();
    } catch (error) {
      res.status(401).json({ message: "Not Authorized , Token failed" });

      errLogger.error(`401 ||"Not Authorized , Token failed" - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    }
  if (!token) {
    res.status(401).json({ message: "Not Authorized , No Token" });

    errLogger.error(`401 ||"Not Authorized , No Token" - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  }
};

module.exports = { protected };
