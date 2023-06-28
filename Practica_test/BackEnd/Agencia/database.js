const mysql = require('mysql');
const connect={};
const connection = mysql.createPool({
  host: "localhost",
  port: '3306',//5000 
  user: 'root',//admin
  password: '12345',//analisisdb
  database: 'fase2ayd2'
});

module.exports = connection;
