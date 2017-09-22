const queries = require('../models/db_functions/goodsFunctions.js');

function get (req, res) {
  res.render('inventory', {title: 'Add Goods', cssPath: '/css/inventory.css'});
}

function post (req, res, next) {
  const data = {
    body: req.bod
    // params: req.params
  };

  queries.addGoods(data, (err, result) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.redirect('/home');
    }
  });
}

module.exports = {
  get,
  post
};
