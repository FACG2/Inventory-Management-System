// const cookie = require('cookie');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
('env2')('config.env');

const verifyToken = (token, cb) => {
  jwt.verify(token, (err, decoded) => {
    if (err) {
      cb(err);
    } else {
      cb(null, decoded);
    }
  });
};

module.exports = {
  verifyToken
};
