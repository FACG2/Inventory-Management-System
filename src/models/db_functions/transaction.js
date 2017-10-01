const dbConnection = require('../Database/db_connection.js');

const addTransaction = (req, cb) => {
  dbConnection.query({
    text: `INSERT INTO transactions (transaction_type, transaction_date, quantity, good_name , good_type, inventory_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    values: [req.transactionType, req.body.transactionDate, req.body.transactionGoodQuantity, req.body.transactionGoodName, req.body.transactionGoodType, req.invId]
  }, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows[0]);
    }
  });
};

const getTransaction = (id, cb) => {
  dbConnection.query({
    text: `SELECT * FROM transactions WHERE id=$1 `,
    values: [id]
  }, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows[0]);
    }
  });
};

const getAll = (data, cb) => {
  dbConnection.query({
    text: 'SELECT * FROM transactions WHERE inventory_id=$1 AND transaction_type=$2',
    values: [ data.inventory_id, 'حذف' ]
  }, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result.rows);
    }
  });
};

module.exports = {
  addTransaction,
  getTransaction,
  getAll
};
