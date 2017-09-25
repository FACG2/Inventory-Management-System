const {addTransaction} = require('../models/db_functions/transactions');
// , getTransactio

function get (req, res) {
  res.render('transaction', {title: 'Add transaction', cssPath: ''});
}

function increment (req, res, next) {
  const data = {
    body: req.body,
    params: req.params,
    transactionType: 'اضافة'
  };
  addTransaction(data, (err, res) => {
    if (err) {
      next(err);
    } else {
      res.redirect('/home'); // /transactions/increment
    }
  });
}

function decrement (req, res, next) {
  const data = {
    body: req.body,
    params: req.params,
    transactionType: 'حذف'
  };
  addTransaction(data, (err, res) => {
    if (err) {
      next(err);
    } else {
      res.redirect('/home'); // /transactions/decrement
    }
  });
}

module.exports = {
  get,
  increment,
  decrement
};
