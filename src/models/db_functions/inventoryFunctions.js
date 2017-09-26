const dbConnection = require('../Database/db_connection.js');

const addInventory = (data, cb) => {
  const sql = {
    text: 'INSERT INTO inventories(name,location,capacity , status , user_id) VALUES($1,$2,$3,$4,$5) RETURNING *',
    values: [data.name, data.location, data.capacity, data.status, data.userId]
  };

  dbConnection.query(sql, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result.rows[0]);
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

const getInventoryByUserId = (id, cb) => {
  const sql = {
    text: 'SELECT * FROM inventories WHERE user_id=$1',
    values: [id]
  };
  dbConnection.query(sql, (err, result) => {
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
  getInventoryStatus,
  getInventoryByUserId
};
