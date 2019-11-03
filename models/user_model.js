var db = require('./db');

module.exports = {

    getInfo: function(email, callback){

		var sql ="select * from users where email=?";
		db.getResults(sql, [email], function(results){
			
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback([]);
			}
		});
		
		/*updateUser: function(data, callback){
			var sql = "update users set fastname=?,lastname=?,email=?,dob=?,city=?,location=? where uid=?";
			db.execute(sql, [data.password,data.id], function(status){
				callback(status);
			});*/
	},
	deleteuser: function(id, callback){
		var sql = "delete from users where uid=?";
		db.execute(sql, [id], function(status){
			callback(status);
		});
	}
}