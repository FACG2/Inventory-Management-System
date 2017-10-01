const db = require('../models/db_functions/index');

const get = (req, res, next) => {
  db.Users.getUserByName(req.user.username, (err, data) => {
    if (err) {
      next(err);
    } else {
      res.render('profile', {data});
    }
  });
};

module.exports = {
  get
};
