//DAO
var employeeDAOHandle = require('./employeedao');

function getAllEmployees(callback) {
 	employeeDAOHandle.getAllEmployees(function(err,empList){
		callback(err,empList);
	});
}

function addEmployee(eno,name,salary,project,callback) {
 	employeeDAOHandle.addEmployee(eno,name,salary,project,function(err,result){
		callback(err,result);
	});
}

module.exports.getAllEmployees = getAllEmployees;
module.exports.addEmployee = addEmployee;
