var db = require('./db');

module.exports = {

    getInfo: function(email, callback){

		var sql ="select * from doctor where email=?";
		db.getResults(sql, [email], function(results){
			
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback([]);
			}
		});
    }
}