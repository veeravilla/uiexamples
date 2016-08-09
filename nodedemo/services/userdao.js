//MySQL
var mysqlconnect = require('./mysqlconnect');


function checkForCredentials(username,password,callback) {

	isValidUser =false;

	//mysqlconnect.connection.connect();

	console.log(' Params '+username + ' ' + password );

	connection.query('select count(*) as usercount from user where uname = ? and upassword = ?',
	 values=[username,password], function(err, rows, fields) {
	  
	  if (err) throw err;
	 
	  console.log('Data received from Db:\n');
	  console.log(rows);
	  console.log('Rows Length  ' + rows.length);

	  if(rows != null &&  rows != undefined && rows != '' && rows[0].usercount == 1){
	  	isValidUser = true;
	  }

	  callback(err,isValidUser);
	});
}
module.exports.checkForCredentials = checkForCredentials;
