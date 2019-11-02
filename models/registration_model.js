var db = require('./db');

module.exports = {

    insert: function(user, callback){

		var sql ="insert into users values('', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		db.execute(sql, [user.firstname, user.lastname,user.dob, user.gender,user.email, user.phone,user.city, user.location,user.password, user.pic], function(status){
			callback(status);
		});
	},
	insertLog: function(log, callback){

		var sql ="insert into login values('', ?, ?, ?)";
		db.execute(sql, [log.email,log.password, log.type], function(status){
			callback(status);
		});
    }
}