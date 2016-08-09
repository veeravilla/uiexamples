//MySQL
var mysqlconnect = require('./mysqlconnect');

function getAllEmployees(callback) {

	//mysqlconnect.connection.connect();

	connection.query('select * from employee',function(err, rows, fields) {
	  
	  if (err) throw err;
	 
	  console.log('Data received from Db:\n');
	  console.log(rows);
	  console.log('Rows Length  ' + rows.length);
	  console.log(JSON.stringify(rows));

	  callback(err,rows);
	});
}

function addEmployee(eno,name,salary,project,callback) {



	connection.query('insert into employee values (?,?,?,?)',
		values=[eno,name,salary,project],function(err, res) {
	  
	  if (err) throw err;
	 
	  console.log('Employee Record Inserted Into DB :\n');

	  callback(err,true);
	});
}


module.exports.getAllEmployees = getAllEmployees;
module.exports.addEmployee = addEmployee;
