const queries = require('../models/db_functions/goodsFunctions.js');
const path = require('path');

function get (req, res) {
  res.render('inventory', {title: 'Add Goods', cssPath: '/css/inventory.css'});
}

function post (req, res, next) {
  const Data = {
    body: req.body,
    imageName: req.files.image.name
  };
  queries.addGoods(Data, (err, result) => {
    if (err) {
      // console.log(err);
      next(err);
    } else {
      if (!req.files) {
        return res.status(400).send('No files were uploaded.');
      }

      var image = req.files.image;

      if (image) {
        image.mv(path.join(__dirname, '..', '..', 'public', 'images', 'uploadFile', req.files.image.name), (err) => {
          if (err) {
            console.log(err);
            return res.redirect('/500');
          } else {
            res.redirect('/home');
          }
        });
      } else {
        res.redirect('/500');
      }
    }
  });
}

module.exports = {
  get,
  post
};
