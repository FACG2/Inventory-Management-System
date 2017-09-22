const {getgoodById, updateGoods} = require('../models/db_functions/goodsFunctions');
// deletGoods
function get (req, res, next) {
  getgoodById(req.params.id, (err, good) => {
    if (err) {
      next(err);
    } else {
      res.render('good', {title: 'Edit Goods', csspath: '/css/inventory.css'});
    }
  });
}

function getEditGood (req, res, next) {
  getgoodById(req.params.id, (err, good) => {
    if (err) {
      next(err);
    } else {
      res.render('EditGood', {good: good[0], name: 'Edit good', csspath: '/css/inventory.css'});
    }
  });
}

function post (req, res, next) {
  const data = {
    body: req.body,
    params: req.params
  };
  updateGoods(data, (err, res) => {
    if (err) {
      next(err);
    } else {
      res.redirect('/home' + req.parms.id);
    }
  });
}

module.exports = {
  get,
  getEditGood,
  post
};
