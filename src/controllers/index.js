const express = require('express');
const router = express.Router();
const landing = require('./landing');
const profile = require('./profile');
const home = require('./inventory');
const addGoods = require('./addGoods');
const updateGood = require('./goods.js');
// const fs = require('fs');

const authController = require('./auth');
const error = require('./error');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware.checkAuth, landing.get);
router.get('/profile', authMiddleware.checkAuth, profile.get);
router.post('/sign-up', authController.signup);
router.post('/sign-in', authController.signIn);
router.get('/logout', authController.logout);
router.get('/goods/add', addGoods.get);
router.post('/goods/new', updateGood.post);

router.get('/home', authMiddleware.checkAuth, home.get);
router.use(error.client);
router.use(error.server);

router.post('/goods/new', (req, res) => {
  console.log(req.body);
  console.log(typeof req.body.image);
  // fs.write
  res.redirect('/goods/new');
});

router.use(error.client);
router.use(error.server);

// router.get('/test', authMiddleware.checkAuth, (req, res) => {
//   res.send('secret route');
// });

router.get('*', (req, res) => {
  res.send('500 Internal Server Error!!!');
});

module.exports = router;
