const db = require('../models/db_functions/index');
const cookie = require('cookie');
const passwordHelper = require('../helpers/password');
require('env2')('config.env');
const {generateToken} = require('../helpers/generateToken');

const signup = (req, res) => {
  passwordHelper.hash(req.body.password, (err, hashedPassword) => {
    if (err) {
      res.redirect('/');
    } else {
      const user = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: '0'
      };
      db.Users.addUser(user, (err1, userFromDB) => {
        if (err1) {
          res.redirect('/');
        } else {
          req.user = {
            id: userFromDB.id,
            username: userFromDB.username
          };
          generateToken(req.user, (error, token) => {
            if (error) {
              res.redirect('/');
            } else {
              res.setHeader('Set-Cookie', `token=${token}`);
              res.redirect('/add-inventory');
            }
          });
        }
      });
    }
  });
};

const signIn = (req, res, next) => {
  if (req.headers.cookie) {
    const {token} = cookie.parse(req.headers.cookie);
    if (token) {
      res.redirect('/home');
    } else {
      res.redirect('/logout');
    }
  } else {
    passwordHelper.hash(req.body.password, (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        db.Users.getUserByName(req.body.username, (err1, userFromDB) => {
          if (err1) {
            next(err1);
          } else {
            if (userFromDB) {
              passwordHelper.compare(req.body.password, userFromDB.password, (err2, result) => {
                if (err2) {
                  next(err2);
                } else {
                  if (result) {
                    const tokenObj = {
                      id: userFromDB.id,
                      username: userFromDB.username
                    };
                    generateToken(tokenObj, (err3, token) => {
                      if (err3) {
                        next(err3);
                      } else {
                        res.setHeader('Set-Cookie', `token=${token}; Max-Age=99999`);
                        res.redirect('/home');
                      }
                    });
                  } else {
                    res.redirect('/');
                  }
                }
              });
            } else {
              res.redirect('/logout');
            }
          }
        });
      }
    });
  }
};

const logout = (req, res) => {
  res.setHeader('Set-Cookie', `token=0; Max-Age=0`);
  res.redirect('/');
};

module.exports = {
  signup,
  logout,
  signIn
};
