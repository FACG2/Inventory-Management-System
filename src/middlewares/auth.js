const {verifyToken} = require('../helpers/verifyToken');
const db = require('../models/db_functions/index');
const cookie = require('cookie');

const checkAuth = (req, res, next) => {
  if (req.headers.cookie) {
    const {token} = cookie.parse(req.headers.cookie);
    if (token) {
      verifyToken(token, (err, decoded) => {
        if (err) {
          res.redirect('/logout');
        } else {
          db.Users.getUserByName(decoded.username, (err1, userFromDB) => {
            if (err1) {
              res.redirect('/logout');
            } else {
              if (req.url === '/') res.redirect('/home');
              else {
                req.user = {
                  id: userFromDB.id,
                  username: userFromDB.username
                };
                next();
              }
            }
          });
        }
      });
    } else {
      if (req.url === '/') res.render('landing');
      else res.redirect('/');
    }
  } else {
    if (req.url === '/') res.render('landing');
    else res.redirect('/');
  }
};

module.exports = {
  checkAuth
};
