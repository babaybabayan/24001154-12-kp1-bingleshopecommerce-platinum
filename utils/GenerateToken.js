require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.signToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET_KEY || "JWT_SUPER_SECRET", {
    expiresIn: process.env.JWT_EXPIRE_TIME || 30000,
  });
};
