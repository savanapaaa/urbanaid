const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.query('SELECT * FROM users LIMIT 1')
  .then(res => {
    console.log('Connection successful!');
    console.log('Sample data:', res.rows);
  })
  .catch(err => {
    console.error('Connection error:', err);
  });

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection test failed:', err);
  } else {
    console.log('Database connected successfully');
  }
});

module.exports = pool;