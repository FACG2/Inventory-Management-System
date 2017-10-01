const dbConnection = require('../Database/db_connection.js');

const deleteGoods = (good, cb) => {
  dbConnection.query({
    text: `DELETE FROM goods WHERE id = $1`,
    values: [good.params.id]
  }, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows[0]);
    }
  });
};

const addGoods = (req, cb) => {
  dbConnection.query({
    text: `INSERT INTO goods (name, quantity, type, charge_date, image, expiry_date, inventory_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
    values: [req.body.goodName, req.body.goodQuantity, req.body.goodType, req.body.chargeDate, req.imageName, req.body.expiryDate, req.invId]},
        (error, res1) => {
          if (error) {
            cb(error);
          } else {
            cb(null, res1.rows);
          }
        });
};

const getAllGoods = (id, cb) => {
  dbConnection.query({
    text: 'SELECT users.username ,goods.* FROM goods INNER JOIN inventories ON inventories.id = goods.inventory_id INNER JOIN users ON users.id = inventories.user_id WHERE users.id = $1',
    values: [id]
  }, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const updateGoods = (goods, cb) => {
  dbConnection.query({
    text: `UPDATE goods SET name = $1, type = $2, image= $3 WHERE id=$4 RETURNING *`,
    values: [goods.body.goodName, goods.body.goodType, goods.body.image, goods.body.id]
  }, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const update = (data, cb) => {
  dbConnection.query({
    text: 'UPDATE goods SET quantity=$1 WHERE id=$2 AND inventory_id=$3 RETURNING *',
    values: [data.newQuantity, data.id, data.invId]
  }, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result.rows[0]);
    }
  });
};

const getGoodById = (id, cb) => {
  dbConnection.query({
    text: 'SELECT * FROM goods WHERE id=$1',
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
  addGoods,  // ddone
  deleteGoods,
  getAllGoods,  // done
  updateGoods, // done
  update,
  getGoodById // done
};
