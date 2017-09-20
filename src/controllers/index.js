const express = require('express');
const router = express.Router();
const landing = require('./landing');
// const db = require('../models/db_functions/index');
const profile = require('./profile');

router.get('/', landing.get);
router.get('/profile', );

module.exports = router;
