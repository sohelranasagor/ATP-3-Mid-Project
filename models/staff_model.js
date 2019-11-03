var db = require('./db');

module.exports = {

    getInfo: function(email, callback){

		var sql ="select * from staff where email=?";
		db.getResults(sql, [email], function(results){
			
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback([]);
			}
		});
    },
	
	//doctorlist......
	
	getAllDoctor: function(callback){
		
		var sql = "select * from doctor";
		db.getResults(sql, [], function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	
	//userlist....
	
	getAllUser: function(callback){
		var sql = "select * from users";
		
		db.getResults(sql, [], function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
    },
	
	
	//update password.....
	checkPassword: function(log, callback){
		var sql = "select * from login where email=? and password=?";
		db.getResults(sql, [log.email,log.password], function(result){
			if(result.length > 0)
			{
				callback(true);
			}
			else{
				callback(false);
			}
		});
	},
	updatePasswordLog: function(data, callback){
		var sql = "update login set password=? where logid=?";
		db.execute(sql, [data.password,data.logId], function(status){
			callback(status);
		});
	},
	updatePassword: function(data, callback){
		var sql = "update staff set password=? where staffid=?";
		db.execute(sql, [data.password,data.staffid], function(status){
			callback(status);
		});
	},
	
	//update profile

	updateStaff: function(data, callback){
		var sql = "update staff set firstname=?, lastname=?, email=?, pic=? where staffid=3";
		db.execute(sql, [data.firstname,data.lastname,data.email,data.pic], function(status){
			callback(status);
		});
	},
	updateStaffLog: function(data, callback){
		var sql = "update login set email=? where logid=8";
		db.execute(sql, [data.email], function(status){
			callback(status);
		});
	}

}


