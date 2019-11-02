var db = require('./db');

module.exports = {

    insert: function(doctor, callback){

		var sql ="insert into doctors values('', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		db.execute(sql, [doctor.firstname, doctor.lastname, doctor.dob, doctor.gender, doctor.designation, doctor.email, doctor.phone, doctor.city, doctor.location, doctor.password, doctor.pic], function(status){
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