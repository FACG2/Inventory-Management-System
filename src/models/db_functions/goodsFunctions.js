const dbConnection = require('../Database/db_connection.js');
// add, update, delet, select
// add new goods
const addGoods = (goods, cb) => {
  const sql = {text: 'INSERT INTO goods (name, quantity, type, charge_date, image, expiry_date, inventory_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    values: [goods.name, goods.quantity, goods.type, goods.charge_date, goods.image, goods.expiry_date, goods.inventory_id]
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      // console.log('hello', err);
      cb(err);
    } else {
      console.log(res.rows[0]);
      cb(null, res.rows[0]);
    }
  });
};

const deletGoods = (good, cb) => {
  const sql = {
    text: `DELETE FROM goods WHERE id = $1`,
    values: [good.id]
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows[0]);
    }
  });
};

const getAllGoods = (cb) => {
  const sql = {
    text: 'SELECT * FROM goods'
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
    text: `UPDATE  goods set type = 'foo' WHERE id = $1 RETURNING *`,
    values: [good.id]
  };

  dbConnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      console.log(res.rows);
      // console.log(res.rows[0].type);
      cb(null, res.rows[0]);
    }
  });
};
module.exports = {
  addGoods: addGoods,
  deletGoods: deletGoods,
  getAllGoods: getAllGoods,
  updateGoods: updateGoods
};
