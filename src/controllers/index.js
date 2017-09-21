const express = require('express');
const router = express.Router();
const landing = require('./landing');
// const db = require('../models/db_functions/index');
// const signup = require('../middlewares/sign_up.js');
const profile = require('./profile');
const authController = require('./auth');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware.checkAuth, landing.get);
router.get('/profile', authMiddleware.checkAuth, profile.get);
router.post('/sign-up', authController.signup);
router.post('/sign-in', authController.signIn);
router.get('/logout', authController.logout);

router.get('/home', authMiddleware.checkAuth, (req, res) => {
  res.send('Home Page!!');
});

router.get('/test', authMiddleware.checkAuth, (req, res) => {
  res.send('secret route');
});

router.get('*', (req, res) => {
  res.send('404 Page Not Found!!!');
});

module.exports = router;
