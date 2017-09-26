const db = require('../models/db_functions/index');

const get = (req, res, next) => {
  console.log(req.user.username);
  db.Users.getUserByName(req.user.username, (err, data) => {
    if (err) {
      next(err);
    } else {
      console.log(data);
      res.render('profile', {data});
    }
  });
};

module.exports = {
  get
};
