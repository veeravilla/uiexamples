//DAO
var userDaoHandle = require('./userdao.js');

function checkForCredentials(username,password,callback) {
 	console.log(' Email '+ username + ' :  Password ' + password);
 	userDaoHandle.checkForCredentials(username,password,function(err,result){
		callback(err,result);
	});
}

module.exports.checkForCredentials = checkForCredentials;