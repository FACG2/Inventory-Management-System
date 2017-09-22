const goodsQuery = require('./db_functions');

module.exports = {
  getAllGoods: goodsQuery.getAll,
  getGoodsById: goodsQuery.getGoodsById,
  postAddGoods: goodsQuery.addGoods

};
