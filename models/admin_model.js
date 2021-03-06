var db = require('./db');

module.exports = {

    insertStaff: function(staff, callback){

		var sql ="insert into staff values('', ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		db.execute(sql, [staff.firstname, staff.lastname,staff.dob, staff.gender,staff.email, staff.phone,staff.password,staff.salary, staff.pic], function(status){
			callback(status);
		});
	},
	insertStaffLog: function(log, callback){

		var sql ="insert into login values('', ?, ?, ?)";
		db.execute(sql, [log.email,log.password, log.type], function(status){
			callback(status);
		});
    },
    getInfo: function(email, callback){

		var sql ="select * from admin where email=?";
		db.getResults(sql, [email], function(results){
			
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback([]);
			}
		});
    },
    insertDoctor: function(doctor, callback){

		var sql ="insert into doctor values('', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		db.execute(sql, [doctor.firstname, doctor.lastname,doctor.dob, doctor.gender,doctor.email, doctor.department, doctor.phone,doctor.password,doctor.salary, doctor.pic], function(status){
			callback(status);
		});
	},
	insertDoctorLog: function(log, callback){

		var sql ="insert into login values('', ?, ?, ?)";
		db.execute(sql, [log.email,log.password, log.type], function(status){
			callback(status);
		});
    },
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
    getAllStaff: function(callback){
		var sql = "select * from staff";
		
		db.getResults(sql, [], function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
	},
	deleteUser: function(id, callback){
		var sql = "delete from users where uid=?";
		db.execute(sql, [id], function(status){
			callback(status);
		});
	},
	deleteUserLog: function(email, callback){
		var sql = "delete from login where email=?";
		db.execute(sql, [email], function(status){
			callback(status);
		});
	},
	deleteDoctorLog: function(email, callback){
		var sql = "delete from login where email=?";
		db.execute(sql, [email], function(status){
			callback(status);
		});
	},
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
		var sql = "update admin set password=? where id=?";
		db.execute(sql, [data.password,data.id], function(status){
			callback(status);
		});
	},
	doctorProfile: function(id, callback){

		var sql ="select * from doctor where doctorid=?";
		db.getResults(sql, [id], function(results){
			
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback([]);
			}
		});
	},
	updateDoctor: function(data, callback){
		var sql = "update doctor set salary=? where doctorid=?";
		db.execute(sql, [data.salary,data.id], function(status){
			callback(status);
		});
	},
	deleteDoctorLog: function(data, callback){
		var sql = "delete from login where email=?";
		db.execute(sql, [data.email], function(status){
			callback(status);
		});
	},
	deleteDoctor: function(data, callback){
		var sql = "delete from doctor where doctorid=?";
		db.execute(sql, [data.id], function(status){
			callback(status);
		});
	},
	insertPhoto: function(data, callback){

		var sql ="insert into photos values('', ?, ?, ?)";
		db.execute(sql, [data.title,data.des, data.pic], function(status){
			callback(status);
		});
	},
	getAllPhoto: function(callback){
		var sql = "select * from photos";
		
		db.getResults(sql, [], function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
	},
	deletePhotogallery: function(id, callback){
		var sql = "delete from photos where id=?";
		db.execute(sql, [id], function(status){
			callback(status);
		});
	},
	updateAdmin: function(data, callback){
		var sql = "update admin set name=?, email=?, pic=? where id=1";
		db.execute(sql, [data.name,data.email,data.pic], function(status){
			callback(status);
		});
	},
	updateAdminLog: function(data, callback){
		var sql = "update login set email=? where logid=2";
		db.execute(sql, [data.email], function(status){
			callback(status);
		});
	},
	getPhotoDetails: function(id, callback){

		var sql ="select * from photos where id=?";
		db.getResults(sql, [id], function(results){
			
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback([]);
			}
		});
	},
	staffProfile: function(id, callback){

		var sql ="select * from staff where staffid=?";
		db.getResults(sql, [id], function(results){
			
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback([]);
			}
		});
	},
	updateStaff: function(data, callback){
		var sql = "update staff set salary=? where staffid=?";
		db.execute(sql, [data.salary,data.id], function(status){
			callback(status);
		});
	},
	deleteStaffLog: function(data, callback){
		var sql = "delete from login where email=?";
		db.execute(sql, [data.email], function(status){
			callback(status);
		});
	},
	deleteStaff: function(data, callback){
		var sql = "delete from staff where staffid=?";
		db.execute(sql, [data.id], function(status){
			callback(status);
		});
	}
}