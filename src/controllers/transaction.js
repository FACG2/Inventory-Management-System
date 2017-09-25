const db = require('../models/db_functions/index');

function get (req, res) {
  res.render('transaction', {title: 'Add transaction', cssPath: ''});
}

function increment (req, res, next) {
  console.log('hi');
  const data = {
    body: req.body,
    transactionType: 'إضافة'
  };
  db.Goods.getGoodById(data.body.id, (err, result) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      console.log(result, 'good result');
      db.Transactions.addTransaction(data, (err1, result1) => {
        if (err1) {
          console.log(err1);
          next(err1);
        } else {
          const newQuantity = parseInt(req.body.transactionGoodQuantity) + result.quantity;
          console.log(newQuantity, 'svfdsfsdfsd');
          db.Goods.update({id: req.body.id, newQuantity: newQuantity}, (err2, result2) => {
            if (err2) {
              console.log(err2);
              next(err2);
            } else {
              console.log(result2);
              res.redirect('/home');
            }
          });
        }
      });
    }
  });
}

function decrement (req, res, next) {
  const data = {
    body: req.body,
    transactionType: 'حذف'
  };
  db.Goods.getGoodById(data.body.id, (err, result) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      db.Transactions.addTransaction(data, (err1, result1) => {
        if (err1) {
          next(err1);
        } else {
          const newQuantity = result.quantity - parseInt(req.body.transactionGoodQuantity);
          db.Goods.update({id: req.body.id, newQuantity: newQuantity}, (err2, result2) => {
            if (err2) {
              next(err2);
            } else {
              res.redirect('/home');
            }
          });
        }
      });
    }
  });
}

module.exports = {
  get,
  increment,
  decrement
};
