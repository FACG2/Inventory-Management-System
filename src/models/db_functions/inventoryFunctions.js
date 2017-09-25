const dbConnection = require('../Database/db_connection.js');

const addInventory = (inv, cb) => {
  const sql = {text: 'INSERT INTO inventories(name, location, capacity, status) VALUES ($1, $2, $3, $4) RETURNING *',
    values: [inv.name, inv.location, inv.capacity, inv.status]
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows[0]);
    }
  });
};

const getAllInv = (cb) => {
  const sql = {
    text: 'SELECT * FROM inventories'
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const updateStatus = (data, cb) => {
  dbConnection.query({
    text: `UPDATE inventories SET status=$1 WHERE id=$2 RETURNING *`,
    values: [data.status, data.id]
  }, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result.rows[0]);
    }
  });
};

const getInventoryStatus = (id, cb) => {
  dbConnection.query({
    text: 'SELECT status FROM inventories WHERE id=$1',
    values: [id]
  }, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result.rows[0]);
    }
  });
};

module.exports = {
  addInventory,
  getAllInv,
  updateStatus,
  getInventoryStatus
};
