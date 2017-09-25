const db = require('../models/db_functions/index');

const get = (req, res, next) => {
  db.Reports.getTransactionsForInventory(1, (err, result) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      let counter = 1;
      result = result.map((item) => {
        // console.log(item);
        item.number = counter++;
        return item;
      });
      const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
      // const
      // console.log(result);
      // const years = getYears();
      // console.log(years);
      res.render('report', {result, days});
    }
  });
};

// const getYears = () => {
//   const date = new Date();
//   const currentYear = date.getFullYear();
//   const years = date.getFullYear() - 1970;
//   var res = [];
//   const arr = new Array(years);
//   arr.map((year, index) => {
//     res.push(currentYear + (index + 1));
//   });
//
//   console.log(res.length);
// };

module.exports = {
  get
};
