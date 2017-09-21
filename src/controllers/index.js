const express = require('express');
const router = express.Router();
const landing = require('./landing');
const profile = require('./profile');
const home = require('./inventory');

const authController = require('./auth');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware.checkAuth, landing.get);
router.get('/profile', authMiddleware.checkAuth, profile.get);
router.post('/sign-up', authController.signup);
router.post('/sign-in', authController.signIn);
router.get('/logout', authController.logout);

router.get('/home', authMiddleware.checkAuth, home.get);

router.get('/test', authMiddleware.checkAuth, (req, res) => {
  res.send('secret route');
});

router.get('*', (req, res) => {
  res.send('404 Page Not Found!!!');
});

module.exports = router;
