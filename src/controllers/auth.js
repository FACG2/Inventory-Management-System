require('env2')('config.env');
const db = require('../models/db_functions/index');
// const cookie = require('cookie');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const {generateToken} = require('../helpers/generateToken');
// const {verifyToken} = require('../helpers/verifyToken');

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
              res.redirect('/home');
            }
          });
        }
      });
    }
  });
};

module.exports = {
  signup
};
