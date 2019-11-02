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

router.post('/',function(request, response){
    admin.getInfo(request.session.email,function(result){    
        response.render('admin/index',{user:result});
    });
    
});

router.post('/addDoctor', function(request, response){
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
});

router.post('/addStaff', function(request, response){
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
});






module.exports = router;