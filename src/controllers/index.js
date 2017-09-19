const express = require('express');
const router = express.Router();
const landing = require('./landing');
// const db = require('../models/db_functions/index');

router.get('/', landing.get);

module.exports = router;
