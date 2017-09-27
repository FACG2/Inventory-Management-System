const dbConnection = require('../Database/db_connection.js');

const addUser = (user, cb) => {
  const sql = {
    text: 'INSERT INTO users(name, email, role, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    values: [user.name, user.email, user.role, user.username, user.password]
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows[0]);
    }
  });
};

const getAllUsers = (cb) => {
  const sql = {
    text: 'SELECT * FROM users'
  };
  dbConnection.query(sql, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

const getUserByName = (username, cb) => {
  dbConnection.query({
    text: 'SELECT * FROM users WHERE username=$1',
    values: [username]
  }, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows[0]);
    }
  });
};

// update
module.exports = {
  addUser,
  getAllUsers,
  getUserByName
};
