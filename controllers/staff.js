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

//userlist....

router.get('/userList',function(request, response){
    staff.getAllUser(function(results){    
        response.render('staff/userList',{users:results});
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
//user appointment list.......

router.get('/userAppointment',function(request, response){   
        response.render('staff/userAppointment');   
});

//Messages.....

router.get('/messages',function(request, response){   
        response.render('staff/messages');   
});

router.get('/inbox',function(request, response){   
        response.render('staff/inbox');   
});

//change password...........

router.get('/changePassword/:id',function(request, response){
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




//Change password

router.post('/changePassword/:id',function(request, response){
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
          id: request.params.id
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

});

module.exports = router;