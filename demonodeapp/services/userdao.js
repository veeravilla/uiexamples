//MySQL
var mysqlconnect = require('./mysqlconnect.js');

//User
var user = require('./user.js');


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

/*function insertUser(id, username, password, callback){
	log("Inserting User %s %s %s" , username, password, id );
    var enUsername = encryptionService.encrypt(username);
	var enPassword = encryptionService.encrypt(password);
	var enId = encryptionService.encrypt(id);
	stmt = handle.db.prepare("INSERT or REPLACE  INTO User(Id, Username, Password,lastSyncDate, LocallyUpdatedDate) VALUES(?,?,?, (Select lastSyncDate from User where Username ='"+ enUsername +"'), (Select LocallyUpdatedDate from User where Username ='"+ enUsername +"'))");
    stmt.run(enId, enUsername, enPassword);
    stmt.finalize();
	callback();
}

function updateLastSyncDate(lastSyncDate, callback){
   var enLastSyncDate = encryptionService.encrypt(lastSyncDate);
	handle.db.run("UPDATE User set lastSyncDate = '"+ enLastSyncDate+"'"  , function(err){
		if(!err){
			callback();
	        
		}else{
			log(err);
		}
      });
    
}

function getLastSyncDate(callback) {
handle.db.all("select lastSyncDate from User ", function(err, rows){
		if(err){
			log("Error while fetching last sync date");
			callback(err,null);
			
		}else{
		    if (rows == null || rows == undefined || rows == '')
			{
				callback(null,null);
			}
			else {
				
				var deLastSyncDate= encryptionService.decrypt(rows[0].lastSyncDate);
				callback(null,deLastSyncDate);			
			}
		}
	});


}



function getUpdateDates(callback) {
handle.db.all("select lastSyncDate, LocallyUpdatedDate  from User ", function(err, rows){
		if(err){
			log("Error while fetching last sync date and locally updated dates from User table");
			callback(err,null);
			
		}else{
		    if (rows == null || rows == undefined || rows == '')
			{
				callback(null,null);
			}
			else {
				
				encryptionService.decryptObject(rows, function(decrypted){
					callback(null,JSON.stringify(decrypted[0]));
			});
			}
		}
	});


}*/

module.exports.checkForCredentials = checkForCredentials;
//module.exports.insertUser = insertUser;
//module.exports.updateLastSyncDate = updateLastSyncDate;
//module.exports.getLastSyncDate = getLastSyncDate;
//module.exports.getUpdateDates = getUpdateDates;