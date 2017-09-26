const dbConnection = require('../Database/db_connection.js');
// add, update, delet, select
// add new goods

const deleteGoods = (good, cb) => {
  const sql = {
    text: `DELETE FROM goods WHERE id = $1`,
    values: [good.params.id]
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows[0]);
    }
  });
};

const addGoods = (req, cb) => {
  dbConnection.query({
    text: `SELECT * FROM inventories WHERE id=$1`,
    values: [req.invId]
  }, (err, inventory) => {
    if (err) {
      cb(err);
    } else {
      const sql = `INSERT INTO goods (name, quantity, type, charge_date, image, expiry_date, inventory_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
      dbConnection.query({
        text: sql,
        values: [req.body.goodName, req.body.goodQuantity, req.body.goodType, req.body.chargeDate, req.imageName, req.body.expiryDate, inventory.rows[0].id]},
        (error, res1) => {
          if (error) {
            cb(error);
          } else {
            cb(null, res1.rows);
          }
        });
    }
  });
};

const getAllGoods = (id, cb) => {
  const sql = {
    text: 'SELECT users.username ,goods.* FROM goods INNER JOIN inventories ON inventories.id = goods.inventory_id INNER JOIN users ON users.id = inventories.user_id WHERE users.id = $1',
    values: [id]
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const updateGoods = (goods, cb) => {
  const sql = {
    text: `UPDATE goods SET name = $1, type = $2,  quantity = $3,  image= $4 WHERE id=$5 RETURNING *`,
    values: [goods.body.goodName, goods.body.goodType, goods.body.quantity, goods.body.image, goods.body.id]
  };

  dbConnection.query(sql, (err, res) => {
    if (err) {
      console.log(err);
      cb(err);
    } else {
      cb(null, res);
    }
  });
};

const update = (data, cb) => {
  dbConnection.query({
    text: 'UPDATE goods SET quantity=$1 WHERE id=$2 RETURNING *',
    values: [data.newQuantity, data.id]
  }, (err, result) => {
    if (err) {
      console.log(err);
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
  addGoods,
  deleteGoods,
  getAllGoods,
  updateGoods,
  update,
  getGoodById
};
