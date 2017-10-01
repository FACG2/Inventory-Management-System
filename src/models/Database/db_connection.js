const {Pool} = require('pg');
require('env2')('./config.env');
let dataUrl;

if (!process.env.DATABASE_URL) {
  throw new Error('No DATABASE_URL provided');
}

process.env.NODE_ENV === 'test' ? dataUrl = process.env.TEST_URL : dataUrl = process.env.DATABASE_URL;

module.exports = new Pool({connectionString: dataUrl, ssl: true});
