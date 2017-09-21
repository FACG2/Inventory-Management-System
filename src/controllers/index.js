const express = require('express');
const router = express.Router();
const landing = require('./landing');
// const db = require('../models/db_functions/index');
// const signup = require('../middlewares/sign_up.js');
const profile = require('./profile');
const authController = require('./auth');
const error = require('./error');

router.get('/', landing.get);
router.get('/profile', profile.get);
router.post('/sign-up', authController.signup);
// router.post('/signin', authController.login);
router.get('/home', (req, res) => {
  res.send('Home Page!!');
});
router.use(error.client);
router.use(error.server);

module.exports = router;
