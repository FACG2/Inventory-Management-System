const dbConnection = require('../Database/db_connection');

const getTransactionsForInventory = (id, cb) => {
  dbConnection.query({
    text: 'SELECT * FROM transactions WHERE inventory_id=$1',
    values: [id]
  }, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result.rows);
    }
  });
};

const addNewTransaction = (data, cb) => {
  dbConnection.query({
    text: 'INSERT INTO transactions(transaction_type , transaction_date , quantity , inventory_id , good_name , good_type) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
    values: [data.transactionType, data.transactionDate, data.quantity, 1, data.goodName, data.goodType]
  }, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result.rows[0]);
    }
  });
};

module.exports = {
  getTransactionsForInventory,
  addNewTransaction
};
