const db = require('../models/db_functions/index');

// get all transactions and filter them and return a format to return it back.
const filterTransactions = (id, cb) => {
  db.Transactions.getAll({inventory_id: id}, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result.reduce((acc, current) => {
        acc.hasOwnProperty(current.good_name) ? acc[current.good_name] += parseInt(current.quantity) : acc[current.good_name] = current.quantity;
        return acc;
      }, {}));
    }
  });
};

module.exports = {
  filterTransactions
};
