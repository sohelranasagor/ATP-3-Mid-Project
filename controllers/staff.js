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

//my profile.............

router.get('/viewProfile',function(request, response){
	staff.getInfo(request.session.email,function(result){    
      response.render('staff/viewProfile',{user:result});
  });
});

//doctor list...............................................

router.get('/doctorList',function(request, response){
    staff.getAllDoctor(function(results){    
        response.render('staff/doctorList',{users:results});
    });
});

//...........

//update my profile.................

router.get('/updateProfile',function(request, response){
	staff.getInfo(request.session.email,function(result){    
      response.render('staff/updateProfile',{user:result});
  });
});


//Rest of mine..........

router.get('/deleteProfile',function(request, response){   
        response.render('staff/deleteProfile');   
});

router.get('/viewSchedule',function(request, response){   
        response.render('staff/viewSchedule');   
});

//doctor's profile.............

router.get('/doctorSchedule',function(request, response){
    response.render('staff/doctorSchedule');
});


/*router.get('/doctorList',function(request, response){
	response.render('staff/doctorList');
    
});
*/
//change password...........

router.get('/changePassword/:staffid',function(request, response){
  response.render('staff/changePassword');
});

//.............

router.post('/',function(request, response){
    staff.getInfo(request.session.email,function(result){    
        response.render('staff/index',{user:result});
    });
    
});
//...............my profile posttt

router.post('/updateProfile',function(request, response){
  request.checkBody('firstName', 'Name field cannot be empty.').notEmpty();
  request.checkBody('lastName', 'Name field cannot be empty.').notEmpty();
  request.checkBody('email', 'Email field cannot be empty.').notEmpty();
  request.checkBody('email', 'invalid email.').matches(/@.+\.com/, 'i');

	const err = request.validationErrors();

	if(err){		
		response.render('staff/updateProfile', {errors: err});
	}else{
    if(request.files){
      var file = request.files.upfile,
        filename=file.name;
      var uploadpath ='/uploads/' + filename;
      file.mv("./uploads/"+filename,function(err){
        if(err){
          console.log("File Upload Failed",err);
          console.log(request.files.upfile.tempFilePath);
          response.send("Error Occured!")
        }
        else {
          var data ={
            pic: uploadpath,
            firstname: request.body.firstName,
			lastname: request.body.lastName,
            email: request.body.email
          }
          staff.updateStaff(data, function(status){
            if(status)
            {
              staff.updateStaffLog(data, function(status){
                if(status)
                {
                  response.redirect('/staff');
                }
              });
            }
          });
        }
      });
    }
    else {
      response.send("No File selected !");
      response.end();
    }
  }
});


//......

router.post('/changePassword/:staffid',function(request, response){
  request.checkBody('oldPassword', 'Old password field cannot be empty.').notEmpty();
  request.checkBody('newPassword', 'New password field cannot be empty.').notEmpty();
  request.checkBody('newPassword', 'New password must be between 6-30 characters long.').len(6, 30);
  request.checkBody("newPassword", "New password must contain atleast one of the special characters [@,#,$,%]").matches(/[@#$%]/, "i");
  request.checkBody('confirmPassword', 'Confirm password field cannot be empty.').notEmpty();
  request.checkBody('confirmPassword', 'Password and Confirm password must match.').equals(request.body.newPassword);

	const err = request.validationErrors();

	if(err){		
		response.render('staff/changePassword', {errors: err});
	}else{
    var log ={
      email: request.session.email,
      password: request.body.oldPassword
    }
    staff.checkPassword(log, function(result){
      if(result)
      {
        var data ={
          logId: request.session.lid,
          password: request.body.newPassword,
          staffid: request.params.staffid
        }
        staff.updatePasswordLog(data, function(status){
          if(status)
          {
            staff.updatePassword(data, function(status){
              if(status)
              {
                response.redirect('/staff');
              }
            });
          }
          else
          {
            response.send("Error updating");
          }
        });
      }
      else
      {
        response.send("Your old password is incorrect");
      }
    });
  }
});

//........................

module.exports = router;