const dbConnection = require('../Database/db_connection.js');

const addTransaction = (req, cb) => {
  const sql = {
    text: `INSERT INTO transactions (transaction_type, transaction_date, quantity, good_id, inventory_id) VALUES ($1,$2,$3,$4)`,
    values: [req.transaction_type, req.transaction_date, req.quantity, req.good_id, req.inventory_id, 1]
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows[0]);
    }
  });
};

const getTransaction = (req, cb) => {
  const sql = {
    text: `SELECT goods.name, goods.type,transactions.transaction_type, transactions.transaction_date, transactions.quantity FROM transactions INNER JOIN goods ON transactions.good_id=goods.id`,
    values: [req.goods.name, req.goods.type, req.transactions.transaction_date, req.transactions.quantity]
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows[0]);
    }
  });
};

module.exports = {
  addTransaction: addTransaction,
  getTransaction: getTransaction
};
