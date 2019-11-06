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


//update my profile.................

router.get('/updateProfile/:id',function(request, response){
	staff.getInfo(request.session.email,function(result){    
      response.render('staff/updateProfile',{user:result});
  });
});

router.post('/',function(request, response){
    staff.getInfo(request.session.email,function(result){    
        response.render('staff/index',{user:result});
    });
    
});

//.......update profile

router.post('/updateProfile/:id',function(request,response){
  var data = {
      id: request.params.id,
      firstname:request.body.firstName,
      lastname:request.body.lastName,
      dob:request.body.dob
  }
  staff.updateStaff(data,function(status){
    if(status){
        response.redirect('/staff');
    }
  });
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