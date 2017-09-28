const bcrypt = require('bcrypt');
require('env2')('config.env');

const hash = (password, cb) => {
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      cb(err);
    } else {
      cb(null, hashedPassword);
    }
  });
};

const compare = (password, hashedPassword, cb) => {
  bcrypt.compare(password, hashedPassword, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result);
    }
  });
};

module.exports = {
  hash,
  compare
};
