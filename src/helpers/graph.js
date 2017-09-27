const db = require('../models/db_functions/index');

// get all transactions and filter them and return a format to return it back.
const filterTransactions = (id, cb) => {
  db.Transactions.getAll({inventory_id: id}, (err, result) => {
    if (err) {
      cb(err);
    } else {
      const output = {};
      result.map((row) => {
        if (output.hasOwnProperty(row.good_name)) {
          output[row.good_name] += parseInt(row.quantity);
        } else {
          output[row.good_name] = row.quantity;
        }
      });
      cb(null, output);
    }
  });
};

module.exports = {
  filterTransactions
};
