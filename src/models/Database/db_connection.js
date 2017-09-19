const {Pool} = require('pg');
require('env2')('./config.env');
var dataUrl;

if (!process.env.DATABASE_URL) {
  throw new Error('No DATABASE_URL provided');
}

if (process.env.NODE_ENV === 'test') {
  dataUrl = process.env.TEST_URL;
} else {
  dataUrl = process.env.DATABASE_URL;
}

const pool = new Pool({connectionString: dataUrl, ssl: true});

module.exports = pool;
