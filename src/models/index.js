const goodsQuery = require('./db_functions');

module.exports = {
  getGoodsById: goodsQuery.getGoodsById,
  getAllGoods: goodsQuery.getAll,
  postAddGoods: goodsQuery.addGoods

};
