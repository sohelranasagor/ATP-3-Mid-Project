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



getById: function(uid, callback){

		var sql = "select * from doctors where uid=?";
		db.getResults(sql, [uid], function(result){
			if(result.length > 0 ){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
},


/*
update: function(doctors, callback){
		//var sql ="update doctors set username=?, password=? where id=?";



	//var sql ="update doctors set firstname = doctors.firstname, lastname = doctors.lastname , dob = doctors.dob, gender = doctors.gender, designation = doctors.designation,  email = doctors.email,  phone = doctors.phone, city = doctors.city, location = doctors.location, password = doctors.password where uid = doctors.uid";


	
	/*	db.execute(sql, [user.username, user.password, user.id], function(status){
			callback(status);
		});*/
/*
	var sql ="update doctors set firstname=?, lastname =?, dob =?, gender =?, designation =?,  email =?,  phone =?, city =?, location =?, password =? where uid=?";
db.execute(sql, [doctors.uid, doctors.firstname, doctors.lastname, doctors.dob, doctors.gender, doctors.designation, doctors.email, doctors.phone, doctors.city, doctors.location, doctors.password], function(status){

//db.execute(sql, function(status){
			callback(status);
		});





	},*/


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







