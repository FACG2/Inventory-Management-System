const db = require('../models/db_functions/index');

const get = (req, res) => {
  db.Goods.getAllGoods((err, result) => {
    if (err) {
      res.redirect('/500');
    } else {
      // console.log(result);
      res.render('inventory.hbs', {result});
    }
  });
};

module.exports = {
  get
};
