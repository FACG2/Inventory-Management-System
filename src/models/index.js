const goodsQueries = require('./db_functions');

module.exports = {
  getGoodsById: goodsQueries.getGoodsById,
  getAllGoods: goodsQueries.getAll,
  postAddGoods: goodsQueries.addGoods,
  postEditeGoods: goodsQueries.updateGoods

};
