var express = require('express');
var doctor = require('../models/doctor_model');
var router = express.Router();

router.get('*', function(request, response, next){
    if(request.session.email != ""){
		next();
	}else{
		response.redirect('/logout');
	}
    
});

router.get('/',function(request, response){
    doctor.getInfo(request.session.email,function(result){  
        response.render('doctor/index',{user:result});
    });
    
});


module.exports = router;