const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
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