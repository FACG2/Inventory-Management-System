const dbConnection = require('../Database/db_connection.js');
// add, update, delet, select
// add new goods

/* const addGoods = (goods, cb) => {
  const sql = {text: 'INSERT INTO goods (name, quantity, type, charge_date, image, expiry_date, inventory_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    values: [goods.name, goods.quantity, goods.type, goods.charge_date, goods.image, goods.expiry_date, goods.inventory_id]
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      // console.log('hello', err);
      cb(err);
    } else {
      // console.log(res.rows[0]);
      cb(null, res.rows[0]);
    }
  });
};
*/
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
    text: `SELECT * FROM inventories WHERE id=1`
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

const getAllGoods = (cb) => {
  const sql = {
    text: 'SELECT * FROM goods '
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      // console.log(res.rows);
      cb(null, res.rows);
    }
  });
};

const updateGoods = (good, cb) => {
  const sql = {
    text: `UPDATE goods SET name = $1, type = $2,  quantity = $3,  image= $4 WHERE id=${good.body.id} RETURNING *`,
    values: [good.body.goodName, good.body.goodType, good.body.quantity, good.body.image]
  };

  dbConnection.query(sql, (err, res) => {
    if (err) {
      console.log(err);
      cb(err);
    } else {
      // console.log(res.rows);
      // console.log(res.rows[0].type);
      cb(null, res);
    }
  });
};

module.exports = {
  addGoods: addGoods,
  deleteGoods: deleteGoods,
  getAllGoods: getAllGoods,
  updateGoods: updateGoods
};
