var express = require('express');
var admin = require('../models/admin_model');
var router = express.Router();


router.get('*', function(request, response, next){
    if(request.session.email != ""){
		next();
	}else{
		response.redirect('/logout');
	}
    
});

router.get('/',function(request, response){
    admin.getInfo(request.session.email,function(result){    
        response.render('admin/index',{user:result});
    });
    
});

router.get('/profile',function(request, response){
  admin.getInfo(request.session.email,function(result){    
      response.render('admin/profile',{user:result});
  });
  
});

router.get('/changePassword/:id',function(request, response){
  response.render('admin/changePassword');
});

router.get('/allUser',function(request, response){
    admin.getAllUser(function(results){    
        response.render('admin/allUser',{users:results});
    });
    
});

router.get('/doctorList',function(request, response){
    admin.getAllDoctor(function(results){    
        response.render('admin/doctorList',{users:results});
    });
    
});

router.get('/staffList',function(request, response){
    admin.getAllStaff(function(results){    
        response.render('admin/staffList',{users:results});
    });
    
});

router.get('/addStaff',function(request, response){
    response.render('admin/addStaff');
});

router.get('/addDoctor',function(request, response){
    response.render('admin/addDoctor');
});

router.get('/deleteUser/:id/:email', function(request, response){

	admin.deleteUser(request.params.id, function(status){
    if(status)
    {
      admin.deleteUserLog(request.params.email, function(status){
        if(status)
        {
          response.redirect('/admin/allUser');
        }
        else
        {
          response.send("error deleting Log");
        }
      });
      
    }
    else
    {
      response.send("error deleting");
    }
	});
});

router.post('/',function(request, response){
    admin.getInfo(request.session.email,function(result){    
        response.render('admin/index',{user:result});
    });
    
});

router.post('/changePassword/:id',function(request, response){
  request.checkBody('oldPassword', 'Old password field cannot be empty.').notEmpty();
  request.checkBody('newPassword', 'New password field cannot be empty.').notEmpty();
	request.checkBody('newPassword', 'New password must be between 6-30 characters long.').len(6, 30);
  request.checkBody("newPassword", "New password must contain atleast one of the special characters [@,#,$,%]").matches(/[@#$%]/, "i");
  request.checkBody('confirmPassword', 'Confirm password field cannot be empty.').notEmpty();
  request.checkBody('confirmPassword', 'Password and Confirm password must match.').equals(request.body.newPassword);

	const err = request.validationErrors();

	if(err){		
		response.render('admin/changePassword', {errors: err});
	}else{
    var log ={
      email: request.session.email,
      password: request.body.oldPassword
    }
    admin.checkPassword(log, function(result){
      if(result)
      {
        var data ={
          logId: request.session.lid,
          password: request.body.newPassword,
          id: request.params.id
        }
        admin.updatePasswordLog(data, function(status){
          if(status)
          {
            admin.updatePassword(data, function(status){
              if(status)
              {
                response.redirect('/admin');
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

router.post('/addDoctor', function(request, response){
  request.checkBody('firstName', 'First name field cannot be empty.').notEmpty();
  request.checkBody('lastName', 'Last name field cannot be empty.').notEmpty();
  request.checkBody('date', 'Date of Birth field cannot be empty.').notEmpty();
  request.checkBody('gender', 'Gender must be select.').notEmpty();
  request.checkBody('phnNo1', 'Phone number cannot be empty').notEmpty();
  request.checkBody('phnNo1', 'Invalid phone Number').len(10);
  request.checkBody('email', 'Email field cannot be empty.').notEmpty();
  request.checkBody('email', 'invalid email.').matches(/@.+\.com/, 'i');
  request.checkBody('salary', 'Salary field cannot be empty.').notEmpty();
  request.checkBody('upfile', 'Please select profile picture.').notEmpty();
  request.checkBody('password', 'Password field cannot be empty.').notEmpty();
	request.checkBody('password', 'Password must be between 6-30 characters long.').len(6, 30);
  request.checkBody("password", "Password must contain atleast one of the special characters [@,#,$,%]").matches(/[@#$%]/, "i");

	const err = request.validationErrors();

	if(err){		
		response.render('admin/addDoctor', {errors: err});
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
            var doctor = {
                firstname: request.body.firstName,
                lastname: request.body.lastName,
                dob: request.body.date,
                gender: request.body.gender,
                email: request.body.email,
                department: request.body.department,
                phone: request.body.phnNo+request.body.phnNo1,
                salary: request.body.salary,
                password: request.body.password,
                pic: uploadpath
            };
            admin.insertDoctor(doctor, function(status){
                if(status)
                {
                  var log = {
                    email: request.body.email,
                    password: request.body.password,
                    type: 2
                  }
                  admin.insertDoctorLog(log, function(status){
                    if(status)
                    {
                      response.redirect('/admin');
                    }
                    else
                    {
                      response.send('Error Log');
                    }
                  });
                  
                }
                else
                {
                  response.send('Error Add Staff');
                }
            });
            console.log("File Uploaded");
          }
        });
      }
      else {
        response.send("No File selected !");
        response.end();
    };
  }
});

router.post('/addStaff', function(request, response){
  request.checkBody('firstName', 'First name field cannot be empty.').notEmpty();
  request.checkBody('lastName', 'Last name field cannot be empty.').notEmpty();
  request.checkBody('date', 'Date of Birth field cannot be empty.').notEmpty();
  request.checkBody('gender', 'Gender must be select.').notEmpty();
  request.checkBody('phnNo1', 'Phone number cannot be empty').notEmpty();
  request.checkBody('phnNo1', 'Invalid phone Number').len(10);
  request.checkBody('email', 'Email field cannot be empty.').notEmpty();
  request.checkBody('email', 'invalid email.').matches(/@.+\.com/, 'i');
  request.checkBody('salary', 'Salary field cannot be empty.').notEmpty();
  request.checkBody('upfile', 'Please select profile picture.').notEmpty();
  request.checkBody('password', 'Password field cannot be empty.').notEmpty();
	request.checkBody('password', 'Password must be between 6-30 characters long.').len(6, 30);
  request.checkBody("password", "Password must contain atleast one of the special characters [@,#,$,%]").matches(/[@#$%]/, "i");

	const err = request.validationErrors();

	if(err){		
		response.render('admin/addStaff', {errors: err});
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
            var staff = {
                firstname: request.body.firstName,
                lastname: request.body.lastName,
                dob: request.body.date,
                gender: request.body.gender,
                phone: request.body.phnNo+request.body.phnNo1,
                email: request.body.email,
                salary: request.body.salary,
                password: request.body.password,
                pic: uploadpath
            };
            admin.insertStaff(staff, function(status){
                if(status)
                {
                  var log = {
                    email: request.body.email,
                    password: request.body.password,
                    type: 3
                  }
                  admin.insertStaffLog(log, function(status){
                    if(status)
                    {
                      response.redirect('/admin');
                    }
                    else
                    {
                      response.send('Error Log');
                    }
                  });
                  
                }
                else
                {
                  response.send('Error Add Staff');
                }
            });
            console.log("File Uploaded");
          }
        });
      }
      else {
        response.send("No File selected !");
        response.end();
    };
  }
});






module.exports = router;