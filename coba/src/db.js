const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.NODE_ENV !=='production' ? 'localhost' : '0.0.0.0',
  user: 'root',
  password: '',
  database: 'bangkit'
});

exports.db = db;