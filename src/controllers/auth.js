// const signUpHelper = require('../helpers/sign_up');
// const loginHelper = require('../helpers/login');
//
// const signup = (req, res, next) => {
//   signUpHelper();
// };
//
// const login = (req, res, next) => {
//   loginHelper.login(req, res, next);
// };
//
// module.exports = {
//   signup,
//   login
// };
// const {validateRegistration} = require('../helpers/validation');
// const {generateToken} = require('../helpers/generateToken');
// const db = require('../models/db_functions/index');
// const cookie = require('cookie');
// // const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

// const signup = (req, res, next) => {
//
// };

// const signup = (req, res, next) => {
//   if (!req.headers.cookie) {
//     // const {token} = cookie.parse(req.headers.cookie);
//     // if (token) {
//       // res.redirect('/');
//     // }
//     if (req.body.password === req.body.confirmPassword) {
//       bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
//         if (err) {
//           console.log(err, ' error 1');
//           res.redirect('/');
//         } else {
//           const data = {
//             name: req.body.name,
//             username: req.body.username,
//             email: req.body.email,
//             password: hashedPassword,
//             role: '0'
//           };
//           validateRegistration(data, (err1, result) => {
//             if (err1) {
//               console.log(err1, 'error 2');
//               // next(err1);
//               res.redirect('/');
//             } else {
//               db.Users.addUser(data, (error, userFromDB) => {
//                 if (error) {
//                   console.log(error, 'error 3');
//                   res.redirect('/');
//                 } else {
//                   const tokenObj = {
//                     id: userFromDB.id,
//                     username: userFromDB.username
//                   };
//                   req.user = tokenObj;
//                 // generation token
//                   generateToken(tokenObj, (err2, results) => {
//                     if (err2) {
//                       console.log(err2, 'error 4');
//                       res.redirect('/');
//                     } else {
//                       results.redirect('/home');
//                       // next();
//                     }
//                   });
//                 }
//               });
//             }
//           });
//         }
//       });
//     }
//   } else {
//     res.redirect('/');
//   }
// };

require('env2')('config.env');
const db = require('../models/db_functions/index');
// const cookie = require('cookie');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = (req, res) => {
  // console.log(Array.isArray(req.body.password), 'req.body.password value');
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
