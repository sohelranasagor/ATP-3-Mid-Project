var express = require('express');
var doctor_model = require('../models/doctor_model');

var router = express.Router();

router.get('*', function(request, response, next){
    if(request.session.email != ""){
		next();
	}else{
		response.redirect('/logout');
	}
    
});
////////////////landing/////////////
router.get('/',function(request, response){
  doctor_model.getInfo(request.session.email,function(result){
      if(result)
      {
        doctor_model.getAllPhoto(function(results){
          if(results)
          {
            response.render('doctor/index',{user:result,photo:results});
          }
        });
        
      }   
        
    });
    
});

///////////////profile///////////////
router.get('/profile',function(request, response){
  doctor_model.getInfo(request.session.email,function(result){    
      response.render('doctor/profile',{user:result});
  });
  
});


router.get('/editprofile/:id',function(request, response){
 doctor_model.getById(request.params.id, function(result){
    response.render('doctor/editprofile',{user:result});
  });
  
});

router.post('/editprofile/:id', function(request, response){

request.checkBody('firstname', 'First name field cannot be empty.').notEmpty();
  request.checkBody('lastname', 'Last name field cannot be empty.').notEmpty();

const err = request.validationErrors();


  if(err){    
    response.render('doctor/editprofile', {errors: err});
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
         var user = { 
          
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
             pic: uploadpath,
             id: request.params.id
  }

          doctor_model.updateDoctor(user, function(status){
            if(status)
            {
            doctor_model.updateDoctorLog(user, function(status){
                if(status)
                {
                  response.redirect('/doctor');
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



/////////////change password//////////////
router.get('/changePassword/:id',function(request, response){
  response.render('doctor/changePassword');
});


router.post('/changePassword/:id',function(request, response){
  request.checkBody('oldPassword', 'Old password field cannot be empty.').notEmpty();
  request.checkBody('newPassword', 'New password field cannot be empty.').notEmpty();
  //request.checkBody('newPassword', 'New password must be between 6-30 characters long.').len(6, 30);
  //request.checkBody("newPassword", "New password must contain atleast one of the special characters [@,#,$,%]").matches(/[@#$%]/, "i");
  request.checkBody('confirmPassword', 'Confirm password field cannot be empty.').notEmpty();
  request.checkBody('confirmPassword', 'Password and Confirm password must match.').equals(request.body.newPassword);

  const err = request.validationErrors();

  if(err){    
    response.render('doctor/changePassword', {errors: err});
  }else{
    var log ={
      email: request.session.email,
      password: request.body.oldPassword
    }
    doctor_model.checkPassword(log, function(result){
      if(result)
      {
        var data ={
          logId: request.session.lid,
          password: request.body.newPassword,
          id: request.params.id
        }
        doctor_model.updatePasswordLog(data, function(status){
          if(status)
          {
            doctor_model.updatePassword(data, function(status){
              if(status)
              {
                response.redirect('/doctor');
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

////////////////photo gallery////////////////////

router.get('/photoGallaryList',function(request, response){
  doctor_model.getAllPhoto(function(results){    
      response.render('doctor/photoGallaryList',{photo:results});
  });
  
});

router.get('/photoDescription/:id',function(request, response){
  doctor_model.getPhotoDetails(request.params.id,function(result){
    response.render('doctor/photoDescription',{photo:result});
  });
});


router.get('/deletePhotoGallery/:id',function(request, response){
  doctor_model.deletePhotogallery(request.params.id, function(result){
    if(result)
    {
      response.redirect('/doctor/photoGallaryList');
    }
  });
});



router.get('/addPhotegallery',function(request, response){
    response.render('doctor/addPhotegallery');
});



router.post('/',function(request, response){
    doctor_model.getInfo(request.session.email,function(result){    
        response.render('doctor/index',{user:result});
    });
    
});


router.post('/addPhotegallery', function(request, response){
  request.checkBody('title', 'Title field cannot be empty.').notEmpty();
  request.checkBody('des', 'Description field cannot be empty.').notEmpty();

  const err = request.validationErrors();

  if(err){    
    response.render('doctor/addPhotegallery', {errors: err});
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
              des: request.body.des,
              title: request.body.title,
              pic: uploadpath
            }
            doctor_model.insertPhoto(data, function(status){
              if(status)
              {
                response.redirect('/doctor');
              }
            });
          }
        });
      }
      else {
        response.send("No File selected !");
        response.end();
    };
  }
});

///////////patient list//////////
router.get('/patientList',function(request, response){
    doctor_model.getAllPatient(function(results){    
        response.render('doctor/patientList',{users:results});
    });
    
});

router.get('/appointmentList',function(request, response){
    doctor_model.getAppointment(function(results){    
        response.render('doctor/appointmentList',{users:results});
    });
    
});

//////////prescription//////
router.get('/addPrescription', function(request, response){
  response.render("doctor/addprescription");
});




router.post('/addPrescription', function(request, response){

 request.checkBody('pname', 'pname cannot be empty.').notEmpty();
  request.checkBody('age', 'age cannot be empty.').notEmpty();

  request.checkBody('appoint', 'appoint cannot be empty.').notEmpty();

 request.checkBody('dname', 'dname cannot be empty.').notEmpty();

 request.checkBody('med', 'medicine cannot be empty.').notEmpty();
  request.checkBody('des', 'advice cannot be empty.').notEmpty();

  const err = request.validationErrors();

  if(err){    
    response.render('doctor/addPrescription', {errors: err});
}



	else{
  var data ={
   pname: request.body.pname,
   age: request.body.age,
   appoint: request.body.appoint,
   dname: request.body.dname,
   med: request.body.med,
   des:request.body.des
  }
doctor_model.insertPrescribe(data, function(status){
    if(status)
    {


      //response.send("done");

     
      response.redirect("/doctor");

    }
  });
}
});



router.get('/Prescriptionlist', function(request, response){
    
    doctor_model.getAllPres(function(result){
      response.render('doctor/prescriptionList',{data:result});    
    }); 
});







router.get('/viewprescription/:id', function(request, response){

  doctor_model.getpresById(request.params.id, function(result){
    response.render('doctor/viewprescription', result);
  })
});



router.get('/addSchedule', function(request, response){
  response.render("doctor/addSchedule");
});




router.post('/addSchedule', function(request, response){


	 request.checkBody('date', 'date cannot be empty.').notEmpty();
  request.checkBody('time', 'time field cannot be empty.').notEmpty();

  request.checkBody('duty', 'duty cannot be empty.').notEmpty();
  const err = request.validationErrors();

  if(err){    
    response.render('doctor/addSchedule', {errors: err});
}
else{
  var data ={
   date: request.body.date,
   time: request.body.time,
   duty: request.body.duty
  
  }
doctor_model.insertSchedule(data, function(status){
    if(status)
    {


      //response.send("done");

     
      response.redirect("/doctor");

    }
  });
}
});



router.get('/scheduleList', function(request, response){
    
    doctor_model.getAllSchedule(function(result){
      response.render('doctor/scheduleList',{data:result});    
    }); 
});

router.get('/viewSchedule/:id', function(request, response){

  doctor_model.getscheduleById(request.params.id, function(result){
    response.render('doctor/viewSchedule', result);
  })
});


////////////message//////////////

router.get('/inbox', function(request, response){
    
    doctor_model.getAllInbox(function(result){
      response.render('doctor/inbox',{data:result});    
    }); 
});




router.get('/viewmsg/:id', function(request, response){

  doctor_model.getmsgById(request.params.id, function(result){
    response.render('doctor/viewmsg', result);
  })
});

router.get('/sendmsg', function(request, response){
  response.render("doctor/sendmsg");
});


router.post('/sendmsg', function(request, response){
 request.checkBody('receiver', 'receiver cannot be empty.').notEmpty();
  request.checkBody('msg', 'message field cannot be empty.').notEmpty();

  
  const err = request.validationErrors();

  if(err){    
    response.render('doctor/sendmsg', {errors: err});
}



else{

  var data ={
   receiver: request.body.receiver,
   msg: request.body.msg
  
  }
doctor_model.insertmsg(data, function(status){
    if(status)
    {

     // response.send("done");
      response.redirect("/doctor");

    }
  });
}
});


module.exports = router;