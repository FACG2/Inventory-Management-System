const express = require('express');
const router = express.Router();
const landing = require('./landing');
const profile = require('./profile');
const home = require('./inventory');
const addGoods = require('./addGoods');
const updateGood = require('./goods.js');

const transactionGood = require('./transaction.js');

const report = require('./report');

// const fs = require('fs');

const authController = require('./auth');
const error = require('./error');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware.checkAuth, landing.get);
router.get('/home', authMiddleware.checkAuth, home.get);
router.get('/profile', authMiddleware.checkAuth, profile.get);
router.post('/sign-up', authController.signup);
router.post('/sign-in', authController.signIn);
router.get('/logout', authController.logout);
router.post('/goods/add', addGoods.post);
router.post('/goods/edit', updateGood.post);
router.post('/goods/:id', updateGood.deleteGoodById);
router.post('/transactions/increment', transactionGood.increment);
router.post('/transactions/decrement', transactionGood.decrement);
router.post('/edit-inventory-status', home.updateInventoryStatus);
router.get('/goods/report', report.get);

router.use(error.client);
router.use(error.server);

router.get('*', (req, res) => {
  res.send('500 Internal Server Error!!!');
});

module.exports = router;
