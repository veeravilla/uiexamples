var mysql      = require('mysql');

connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root1234',
  database : 'test'
});

connection.connect();
 
module.exports.connection = connection;