require('env2')('config.env');
const db = require('../models/db_functions/index');
const cookie = require('cookie');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {generateToken} = require('../helpers/generateToken');

const signup = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      console.log(err, 'error 1');
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
          console.log(err1, 'error 2');
          res.redirect('/');
        } else {
          req.user = {
            id: userFromDB.id,
            username: userFromDB.username
          };
          jwt.sign(req.user, process.env.SECRET, (error, token) => {
            if (error) {
              console.log(error, 'error 3');
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
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        db.Users.getUserByName(req.body.username, (err1, userFromDB) => {
          if (err1) {
            console.log(err1);
            next(err1);
          } else {
            if (userFromDB) {
              bcrypt.compare(req.body.password, userFromDB.password, (err2, result) => {
                if (err2) {
                  console.log(err2);
                  next(err2);
                } else {
                  if (result) {
                    const tokenObj = {
                      id: userFromDB.id,
                      username: userFromDB.username
                    };
                    generateToken(tokenObj, (err3, token) => {
                      if (err3) {
                        console.log(err3);
                        next(err3);
                      } else {
                        res.setHeader('Set-Cookie', `token=${token}; Max-Age=99999`);
                        res.redirect('/home');
                      }
                    });
                  } else {
                    res.redirect('/');
                    // next({message: 'error hashing password'});
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
