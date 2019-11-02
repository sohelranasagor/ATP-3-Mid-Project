var express = require('express');
var doctor_model = require('../models/doctor_model');
var router = express.Router();
/*
router.get('*', function(request, response, next){
    if(request.session.email != ""){
		next();
	}else{
		response.redirect('/logout');
	}
    
});*/
/*
router.get('/',function(request, response){
    doctor.getInfo(request.session.email,function(result){  
        response.render('doctor/index',{user:result});
    });
    
});



router.get('/',function(request, response){
    doctor.getInfo(request.session.email,function(result){  
        response.render('doctor/index',{user:result});
    });
    
});*/



router.get('/viewall',function(request, response){
    doctor_model.getInfo(request.session.email, function(result){            ////right one
        response.render('doctor/viewall',result);
    });
    
});




router.get('/details', function(request, response){
		
	doctor_model.getAll(function(results){
			response.render('doctor/details', {doctors: results});		
		});	
});

/*
router.get('/viewall/:uid', function(request, response){

doctor_model.getById(request.params.uid, function(result){
		response.render('doctor/viewall', result);
	})
});
*/



router.get('/edit/:id', function(request, response){

	doctor_model.getById(request.params.id, function(result){
		response.render('doctor/edit', result);
	});
	
});

router.post('/edit/:id', function(request, response){

	var doctors = {

		
		
		firstname: request.body.firstname,

        lastname: request.body.lastname,
        dob: request.body.dob,
        gender: request.body.gender,
        designation: request.body.designation,
        email: request.body.email,
        phone: request.body.phone,
        city: request.body.city,
        location: request.body.location,
		password: request.body.password,
		uid: request.params.uid,
	};

	doctor_model.update(doctors, function(status){
		
		if(status){
		//	response.redirect('/doctor/viewall');

         response.send("done");



		}else{
			response.redirect('/doctor/edit/'+request.params.uid);
		}
	});
	
});












module.exports = router;