const express = require('express');
const router = express.Router();
const landing = require('./landing');
const profile = require('./profile');
const home = require('./inventory');
const goods = require('./goods');
const addInventory = require('./addInventory');
const transactionGood = require('./transaction');
const report = require('./report');
const authController = require('./auth');
const error = require('./error');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware.checkAuth, landing.get);
router.get('/home', authMiddleware.checkAuth, home.get);
router.get('/profile', authMiddleware.checkAuth, profile.get);
router.post('/sign-up', authController.signup);
router.post('/sign-in', authController.signIn);
router.get('/logout', authController.logout);
router.post('/goods/add', authMiddleware.checkAuth, home.addGood);
router.post('/goods/edit', authMiddleware.checkAuth, goods.edit);
router.get('/goods/report', authMiddleware.checkAuth, report.get);
router.get('/goods/graph', authMiddleware.checkAuth, home.getGraph);
router.post('/goods/:id', authMiddleware.checkAuth, goods.deleteGood);
router.post('/transactions/increment', authMiddleware.checkAuth, transactionGood.increment);
router.post('/transactions/decrement', authMiddleware.checkAuth, transactionGood.decrement);
router.get('/add-inventory', authMiddleware.checkAuth, addInventory.get);
router.post('/add-inventory', authMiddleware.checkAuth, addInventory.post);
router.post('/edit-inventory-status', authMiddleware.checkAuth, home.updateInventoryStatus);

router.use(error.client);
router.use(error.server);

router.get('*', (req, res) => {
  res.send('500 Internal Server Error!!!');
});

module.exports = router;
