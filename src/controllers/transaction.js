const db = require('../models/db_functions/index');

function get (req, res) {
  res.render('transaction');
}

const increment = (req, res, next) => {
  const data = {
    invId: req.user.id,
    body: req.body,
    transactionType: 'إضافة'
  };
  addTransaction(data, res, next, '+');
};

const decrement = (req, res, next) => {
  const data = {
    body: req.body,
    invId: req.user.id,
    transactionType: 'سحب'
  };
  addTransaction(data, res, next, '-');
};

const addTransaction = (data, res, next, type) => {
  db.Goods.getGoodById(data.body.id, (err, goodFromDB) => {
    if (err) {
      next(err);
    } else {
      db.Transactions.addTransaction(data, (err1, transactionFromDB) => {
        if (err1) {
          next(err1);
        } else {
          let newQuantity;
          if (type === '+') newQuantity = goodFromDB.quantity + parseInt(data.body.transactionGoodQuantity);
          else newQuantity = goodFromDB.quantity - parseInt(data.body.transactionGoodQuantity);
          db.Goods.update({id: goodFromDB.id, newQuantity: newQuantity, invId: data.invId}, (err2, result2) => {
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
};

module.exports = {
  get,
  increment,
  decrement
};
