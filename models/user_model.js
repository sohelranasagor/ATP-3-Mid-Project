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
		
	
	},
	deleteuser: function(id, callback){
		var sql = "delete from users where uid=?";
		db.execute(sql, [id], function(status){
			callback(status);
		});
	},
	updateUser: function(user, callback){
		var sql = "update users set firstname=?,lastname=?,dob=?,city=?,location=? where uid=?";
		db.execute(sql, [user.fname,user.lname,user.dob,user.city,user.location,user.id], function(status){
			callback(status);
		});
	},
	getAllDoctor: function(callback){
		var sql = "select * from doctor";
		
		db.getResults(sql, [], function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
    }
}