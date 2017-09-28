const db = require('../models/db_functions/index');

const get = (req, res, next) => {
  res.render('inventoryPage');
};

const post = (req, res, next) => {
  const data = {
    name: req.body.name,
    location: req.body.location,
    capacity: 300,
    status: 'فارغ',
    user_id: req.user.id
  };
  db.Inventories.addInventory(data, (err, result) => {
    if (err) {
      res.redirect('/500');
    } else {
      res.redirect('/home');
    }
  });
};

module.exports = {
  get,
  post
};
