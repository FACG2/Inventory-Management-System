const {Pool} = require('pg');
require('env2')('./config.env');
let dataUrl;

process.env.NODE_ENV === 'test' ? dataUrl = process.env.TEST_URL : dataUrl = process.env.DATABASE_URL;

if (!dataUrl) {
  throw new Error('No DATABASE_URL provided');
}

module.exports = new Pool({connectionString: dataUrl, ssl: true});
