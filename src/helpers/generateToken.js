const jwt = require('jsonwebtoken');

const generateToken = (tokenObj, cb) => {
  jwt.sign(tokenObj, process.env.SECRET, (err, token) => {
    if (err) {
      cb(err);
    } else {
      cb(null, token);
    }
  });
};

module.exports = {
  generateToken
};
