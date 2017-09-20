const {validateRegistration} = require('../helpers/validation');
const {generateToken} = require('../helpers/generateToken');
const db = require('../models/db_functions/index');
const cookie = require('cookie');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function signup (req, res, next) {
  if (req.headers.cookie) {
    const {token} = cookie.parse(req.headers.cookie);
    if (token) {
      res.redirect('/');
    }
    if (req.body.password === req.body.confirmPassword) {
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
          console.log(err);
          res.redirect('/');
        } else {
          const data = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            role: '0'
          };
          validateRegistration(data, (err, result) => {
            if (err) {
              next(err);
            } else {
              db.addUser(data, (error, userFromDB) => {
                if (error) {
                  res.redirect('/');
                } else {
                  const tokenObj = {
                    id: userFromDB.id,
                    username: userFromDB.username
                  };
                  req.user = tokenObj;
                // generation token
                  generateToken(tokenObj, (err, results) => {
                    if (err) {
                      res.redirect('/');
                    } else {
                      results.redirect('/home');
                      // next();
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  } else {
    res.redirect('/');
  }
}

module.exports = signup;
