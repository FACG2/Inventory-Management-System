const db = require('../models/db_functions/index');
const {filterTransactions} = require('../helpers/graph');
const path = require('path');

const get = (req, res) => {
  db.Goods.getAllGoods(req.user.id, (err, result) => {
    if (err) {
      res.redirect('/500');
    } else {
      getStatus((err1, status) => {
        if (err1) {
          res.redirect('/500');
        } else {
          if (status) {
            result.status = status;
            res.render('inventory', { result });
          } else {
            res.redirect('/500');
          }
        }
      });
    }
  });
};

const updateInventoryStatus = (req, res) => {
  db.Inventories.updateStatus({id: 1, status: req.body.status}, (err, result) => {
    if (err) {
      res.redirect('/500');
    } else {
      res.json().send(result.status);
    }
  });
};

const getStatus = (cb) => {
  db.Inventories.getInventoryStatus(1, (err, result) => {
    if (err) {
      cb(err);
    } else {
      cb(null, result.status);
    }
  });
};

const getGraph = (req, res, next) => {
  filterTransactions(req.user.id, (err, output) => {
    if (err) {
      next(err);
    } else {
      const outputObj = {
        labels: [],
        data: []
      };
      Object.keys(output).map((key) => {
        outputObj.labels.push(key);
        outputObj.data.push(output[key]);
      });
      res.send(JSON.stringify(outputObj));
    }
  });
};

const addInventory = (req, res, next) => {
  const data = {
    name: req.body.name,
    location: req.body.location,
    capacity: req.body.capacity,
    status: req.body.status,
    user_id: req.user.id
  };
  db.Inventories.addInventory(data, (err, result) => {
    if (err) {
      res.redirect('/500');
    } else {
      res.redirect('/home');
    }
  });
};

const addGood = (req, res, next) => {
  const Data = {
    invId: req.user.id,
    body: req.body,
    imageName: req.files.image.name
  };
  db.Goods.addGoods(Data, (err, result) => {
    if (err) {
      next(err);
    } else {
      if (!req.files) {
        next(err);
      }
      var image = req.files.image;

      if (image) {
        image.mv(path.join(__dirname, '..', '..', 'public', 'images', 'uploadFile', req.files.image.name), (err) => {
          if (err) {
            res.rediect('/500');
          } else {
            res.redirect('/home');
          }
        });
      } else {
        res.redirect('/500');
      }
    }
  });
};

module.exports = {
  get,
  updateInventoryStatus,
  getGraph,
  addInventory,
  addGood
};
