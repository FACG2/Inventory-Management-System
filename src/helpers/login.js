// const {verifyToken} = require('./verifyToken');
const cookie = require('cookie');
const generateToken = require('./generateToken');
const db = require('../models/db_functions/index');
const bcrypt = require('bcrypt');

const login = (req, res, next) => {
  if (req.headers.cookie) {
    const {token} = cookie.parse(req.headers.cookie);
    if (token) {
      res.redirect('/home');
    } else {
      next({message: 'You are not allowed to login again'});
    }
  } else {
    db.Users.getUserByName(req.body.username, (err, userFromDB) => {
      if (err) {
        next(err);
      } else {
        if (userFromDB) {
          bcrypt.compare(req.body.password, userFromDB.password, (err, result) => {
            if (err) {
              next(err);
            } else {
              if (result) {
                const tokenObj = {
                  id: userFromDB.id,
                  username: userFromDB.username
                };
                generateToken(tokenObj, (err, token) => {
                  if (err) {
                    next(err);
                  } else {
                    res.setHeader('Set-Cookie', `token=${token}; Max-Age=9999`);
                    res.redirect('/home');
                  }
                });
              } else {
                next({message: 'no user found'});
              }
            }
          });
        }
      }
    });
  }
};

module.exports = {
  login
};
