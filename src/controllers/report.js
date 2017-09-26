const db = require('../models/db_functions/index');

const get = (req, res, next) => {
  db.Reports.getTransactionsForInventory(req.user.id, (err, result) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      let counter = 1;
      result = result.map((item) => {
        item.number = counter++;
        return item;
      });
      const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
      res.render('report', {result, days});
    }
  });
};

module.exports = {
  get
};
