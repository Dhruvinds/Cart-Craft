const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "HimanshuRupavatiya", {
    expiresIn: "5d",
  });
};

module.exports = generateToken;
