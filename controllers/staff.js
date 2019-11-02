var express = require('express');
var staff = require('../models/staff_model');
var router = express.Router();

router.get('*', function(request, response, next){
    if(request.session.email != ""){
		next();
	}else{
		response.redirect('/logout');
	}
    
});

router.get('/',function(request, response){
    staff.getInfo(request.session.email,function(result){  
        response.render('staff/index',{user:result});
    });
    
});

//doctor list...............................................

router.get('/doctorList',function(request, response){
    staff.getAllDoctor(function(results){    
        response.render('staff/doctorList',{users:results});
    });
});

//my profile.............

router.get('/viewProfile',function(request, response){
	staff.getInfo(request.session.email,function(result){    
      response.render('staff/viewProfile',{user:result});
  });
});

/*
router.get('/viewProfile',function(request, response){
  staff.getInfo(request.session.email,function(result){    
      response.render('staff/viewProfile',{user:result});
});

router.get('/updateProfile',function(request, response){   
        response.render('staff/updateProfile');   
});

router.get('/deleteProfile',function(request, response){   
        response.render('staff/deleteProfile');   
});

router.get('/viewSchedule',function(request, response){   
        response.render('staff/viewSchedule');   
});

//.............

router.get('/doctorSchedule',function(request, response){
    response.render('staff/doctorSchedule');
});


router.get('/doctorList',function(request, response){
	response.render('staff/doctorList');
    
});

router.get('/doctorList',function(request, response){
    staff.getAllDoctor(function(results){    
        response.render('staff/doctorList',{users:results});
    });

router.post('/',function(request, response){
    response.render('staff/index');
});

router.post('/',function(request, response){
    staff.getInfo(request.session.email,function(result){    
        response.render('staff/index',{user:result});
    });
    
});
*/

//..........
module.exports = router;