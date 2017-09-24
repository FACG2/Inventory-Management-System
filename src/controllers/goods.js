
const {getgoodById, updateGoods, deleteGoods} = require('../models/db_functions/goodsFunctions');

// deletGoods
function get (req, res, next) {
  getgoodById(req.params.id, (err, good) => {
    if (err) {
      next(err);
    } else {
      res.render('inventory', {good: good[0], title: good[0].title, csspath: '/css/inventory.css'});
    }
  });
}

function getEditGood (req, res, next) {
  getgoodById(req.params.id, (err, good) => {
    if (err) {
      next(err);
    } else {
      res.render('inventory', {good: good[0], title: 'Edit good', csspath: '/css/inventory.css'});
    }
  });
}

function post (req, res, next) {
  const data = {
    body: req.body,
    params: req.params
  };

  updateGoods(data, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.redirect('/home');
    }
  });
}

function deleteGoodById (req, res, next) {
  const data = {
    body: req.body,
    params: req.params
  };

  deleteGoods(data, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.redirect('/home');
    }
  });
}

module.exports = {
  get,
  getEditGood,
  post,
  deleteGoodById
};
