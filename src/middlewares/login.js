const cookie = require('cookie');
const {generateToken} = require('../helpers/generateToken');
const {verifyToken} = require('../helpers/verifyToken');

const login = (req, res, next) => {
  if (req.headers.cookie) {
    const {token} = cookie.parse(req.headers.cookie);
    if (token) {
      verifyToken(token, (err, result) => {
        if (err) {
          next(err);
        } else {
          if (result) {
            res.redirect('/inventory');
          } else {
            next({message: 'you are not authorized, sorry!!'});
          }
        }
      });
    } else {
      // generateToken(user, );
    }
  } else {
    res.redirect('/');
  }
};

module.exports = {
  login
};
