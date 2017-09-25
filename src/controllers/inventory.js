const db = require('../models/db_functions/index');

const get = (req, res) => {
  db.Goods.getAllGoods((err, result) => {
    if (err) {
      res.redirect('/500');
    } else {
      getStatus((err1, status) => {
        if (err1) {
          console.log(err1);
          res.redirect('/500');
        } else {
          if (status) {
            result.status = status;
            res.render('inventory', { result });
          } else {
            res.redirect('/500');
          }
        }
      });
    }
  });
};

const updateInventoryStatus = (req, res) => {
  db.Inventories.updateStatus({id: 1, status: req.body.status}, (err, result) => {
    if (err) {
      res.redirect('/500');
    } else {
      res.json().send(result.status);
    }
  });
};

const getStatus = (cb) => {
  db.Inventories.getInventoryStatus(1, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result.status);
    }
  });
};

module.exports = {
  get,
  updateInventoryStatus
};
