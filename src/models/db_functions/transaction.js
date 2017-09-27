const dbConnection = require('../Database/db_connection.js');

const addTransaction = (req, cb) => {
  const sql = {
    text: `INSERT INTO transactions (transaction_type, transaction_date, quantity, good_name , good_type, inventory_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    values: [req.transactionType, req.body.transactionDate, req.body.transactionGoodQuantity, req.body.transactionGoodName, req.body.transactionGoodType, req.invId]
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      console.log(err);
      cb(err);
    } else {
      cb(null, res.rows[0]);
    }
  });
};

const getTransaction = (id, cb) => {
  const sql = {
    text: `SELECT * FROM transactions WHERE id=$1 `,
    values: [id]
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows[0]);
    }
  });
};

const getAll = (data, cb) => {
  const sql = {
    text: 'SELECT * FROM transactions WHERE inventory_id=$1 AND transaction_type=$2',
    values: [ data.inventory_id, 'حذف' ]
  };
  dbConnection.query(sql, (err, result) => {
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
