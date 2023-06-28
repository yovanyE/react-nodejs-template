const mysql = require('mysql');
const connect={};
const connection = mysql.createPool({
  host: "ec2-34-229-70-53.compute-1.amazonaws.com",
  port: '3306',//5000 
  user: 'ayd2',//admin
  password: 'ayd22023',//analisisdb
  database: 'fase2ayd2'
});

module.exports = connection;
