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
	}
}