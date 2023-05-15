const { promisify } = require('util');
const mysql = require('mysql');
const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      return console.error('DATABASE CONNECTION WAS CLOSED');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      return console.error('DATABASE HAS TO MANY CONNECTION');
    }
    if (err.code === 'ECONNREFUSED') {
      return console.error('DATABASE CONNECTION WAS REFUSED');
    }
  }

  if (connection) connection.release();
  console.log('DB is Connected...');
  return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;