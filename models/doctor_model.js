var db = require('./db');

module.exports = {

    getInfo: function(email, callback){

		var sql ="select * from doctors where email=?";
		db.getResults(sql, [email], function(result){
			
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
    },


updateDoctor: function(user, callback){
		var sql = "update doctors set firstname=?, lastname=?, dob=?, gender=?, designation=?, email=?, phone=?, city=?, location=?, password=?, pic=? where id=?";
		db.execute(sql, [user.firstname, user.lastname, user.dob, user.gender, user.designation, user.email, user.phone, user.city, user.location, user.password, user.pic, user.id], function(status){
			callback(status);
		});
	},
updateDoctorLog: function(user, callback){
		var sql = "update login set email=? where logid=19";
		db.execute(sql, [user.email], function(status){
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









getById: function(id, callback){

		var sql = "select * from doctors where id=?";
		db.getResults(sql, [id], function(result){
			if(result.length > 0 ){
				callback(result[0]);
			}else{
				callback([]);
			}
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
		var sql = "update doctors set password=? where id=?";
		db.execute(sql, [data.password,data.id], function(status){
			callback(status);
		});
	},



 getAllPatient: function(callback){
		var sql = "select * from patient";
		
		db.getResults(sql, [], function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
    },

getAppointment: function(callback){
		var sql = "select * from appointment";
		
		db.getResults(sql, [], function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
    },



insertPrescribe: function(data, callback){

		var sql ="insert into prescribe values('', ?, ?, ?, ?, ?, ?)";
		db.execute(sql, [data.pname, data.age, data.appoint, data.dname, data.med, data.des], function(status){
			callback(status);
		});
	},




getAllPres: function(callback){
		var sql = "select * from prescribe";
		
		db.getResults(sql, [], function(result){         /////okk
			
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});	
	},




getpresById: function(id, callback){

			var sql = "select * from prescribe where id=?";
			db.getResults(sql, [id], function(result){
				if(result.length > 0 ){
					callback(result[0]);
				}else{
					callback([]);
				}
			});
	},




insertSchedule: function(data, callback){

		var sql ="insert into schedule values('', ?, ?, ?)";
		db.execute(sql, [data.date, data.time, data.duty], function(status){
			callback(status);
		});
	},

getAllSchedule: function(callback){
		var sql = "select * from schedule";
		
		db.getResults(sql, [], function(result){         /////okk
			
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});	
	},




getscheduleById: function(id, callback){

			var sql = "select * from schedule where id=?";
			db.getResults(sql, [id], function(result){
				if(result.length > 0 ){
					callback(result[0]);
				}else{
					callback([]);
				}
			});
	},


insertmsg: function(data, callback){

		var sql ="insert into sendmsg values('', ?, ?)";
		db.execute(sql, [data.receiver, data.msg], function(status){
			callback(status);
		});
	},










getAllInbox: function(callback){
		var sql = "select * from inbox";
		
		db.getResults(sql, [], function(result){         /////okk
			
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});	
	},



getmsgById: function(id, callback){

			var sql = "select * from inbox where id=?";
			db.getResults(sql, [id], function(result){
				if(result.length > 0 ){
					callback(result[0]);
				}else{
					callback([]);
				}
			});
	},







update: function(doctors, callback){
		var sql ="update doctors set  firstname='"+ doctors.firstname+"', lastname='"+doctors.lastname+"', dob='"+doctors.dob+"', gender='"+doctors.gender+"', designation ='"+doctors.designation+"', email ='"+doctors.email+"', phone ='"+doctors.phone+"', location ='"+doctors.location+"', password ='"+doctors.password+"' ,where email="+doctors.email;
		
		console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});


},

getAll: function(callback){
		var sql = "select * from doctors";
		
		db.getResults(sql, [], function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
}





}







