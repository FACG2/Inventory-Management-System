const express = require('express');
const router = express.Router();
const landing = require('./landing');
// const db = require('../models/db_functions/index');
// const signup = require('../middlewares/sign_up.js');
const profile = require('./profile');
const signup = require('./signup');
const inventory = require('./inventory.js');

router.get('/', landing.get);
router.get('/profile', profile.get);
router.post('/signup', signup.post);
router.get('/inventory', inventory.get);

module.exports = router;
