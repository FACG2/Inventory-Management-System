const {validateRegistration} = require('../helpers/validation');
const {generateToken} = require('../helpers/generateToken');
const db = require('../models/db_functions/index');
const cookie = require('cookie');
const bcrypt = require('bcrypt');

function signup (req, res, next) {
  if (!req.headers.cookie) {
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
          validateRegistration(data, (err1, result) => {
            if (err1) {
              console.log(err1);
              next(err1);
            } else {
              db.addUser(data, (error, userFromDB) => {
                if (error) {
                  console.log(error);
                  res.redirect('/');
                } else {
                  const tokenObj = {
                    id: userFromDB.id,
                    username: userFromDB.username
                  };
                  req.user = tokenObj;
                // generation token
                  generateToken(tokenObj, (err2, results) => {
                    if (err2) {
                      console.log(err2);
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
