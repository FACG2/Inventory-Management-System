const db = require('../models/db_functions/index');

// deletGoods
const get = (req, res, next) => {
  db.Goods.getgoodById(req.params.id, (err, good) => {
    if (err) {
      next(err);
    } else {
      res.render('inventory', {good: good[0], title: good[0].title, csspath: '/css/inventory.css'});
    }
  });
};

const getEditGood = (req, res, next) => {
  db.Goods.getgoodById(req.params.id, (err, good) => {
    if (err) {
      next(err);
    } else {
      res.render('inventory', {good: good[0], title: 'Edit good', csspath: '/css/inventory.css'});
    }
  });
};

const edit = (req, res, next) => {
  const data = {
    body: req.body,
    params: req.params
  };

  db.Goods.updateGoods(data, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.redirect('/home');
    }
  });
};

const deleteGood = (req, res, next) => {
  const data = {
    body: req.body,
    params: req.params
  };

  db.Goods.deleteGoods(data, (err, result) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.redirect('/home');
    }
  });
};

module.exports = {
  get,
  getEditGood,
  edit,
  deleteGood
};
