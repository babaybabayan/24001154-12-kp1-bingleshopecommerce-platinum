const jwt = require("jsonwebtoken");

exports.verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return reject(err);
      }
      resolve(user);
    });
  });
};
