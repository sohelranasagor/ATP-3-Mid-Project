var express = require('express');
var doctor_model = require('../models/doctor_model');

//var admin = require('../models/admin_model');
var router = express.Router();

router.get('*', function(request, response, next){
    if(request.session.email != ""){
		next();
	}else{
		response.redirect('/logout');
	}
    
});

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







































 
/*



if(err){    



 var user = { 
          
            firstname: request.body.firstname,
            lastname: request.body.lastname,
            dob: request.body.dob,
            gender: request.body.gender,
          designation: request.body.designation,
          
             email: request.body.email,
            phone: request.body.phnNo+request.body.phnNo1,
           
            city: request.body.city,
            location: request.body.location,
            password: request.body.password,
             pic: uploadpath,
             id: request.params.id
  };









  doctor_model.updateDoctor(user, function(status){
    
    if(status){
      response.redirect('/doctor/index');
    }else{
      response.redirect('/doctor/editprofile/'+request.params.id);
    }
  });
  
});*/












































//router.post('/editprofile',function(request, response){
 /* request.checkBody('name', 'Name field cannot be empty.').notEmpty();
  request.checkBody('email', 'Email field cannot be empty.').notEmpty();
  request.checkBody('email', 'invalid email.').matches(/@.+\.com/, 'i');




  /////////////////

  request.checkBody('firstname', 'First name field cannot be empty.').notEmpty();
  request.checkBody('lastname', 'Last name field cannot be empty.').notEmpty();
  request.checkBody('dob', 'Date of Birth field cannot be empty.').notEmpty();
  request.checkBody('gender', 'Gender must be select.').notEmpty();

 request.checkBody('designation', 'designation must be selected.').notEmpty();

 request.checkBody('email', 'Email field cannot be empty.').notEmpty();
  request.checkBody('email', 'invalid email.').matches(/@.+\.com/, 'i');
  request.checkBody('phone', 'Phone number cannot be empty').notEmpty();
 
  
  request.checkBody('city', 'City field cannot be empty.').notEmpty();
  request.checkBody('location', 'Location field cannot be empty.').notEmpty();
  request.checkBody('password', 'Password field cannot be empty.').notEmpty();
 // request.checkBody('password', 'Password must be between 6-30 characters long.').len(6, 30);
 //request.checkBody("password", "Password must contain atleast one of the special characters [@,#,$,%]").matches(/[@#$%]/, "i");
  //request.checkBody('confirmPassword', 'Confirm password field cannot be empty.').notEmpty();
 // request.checkBody('confirmPassword', 'Password and Confirm password must match.').equals(request.body.password);

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
          var data ={
           // pic: uploadpath,
           


            //name: request.body.name,
           // email: request.body.email
            // pic: uploadpath,
             pic: uploadpath,
			firstname: request.body.firstname,
            lastname: request.body.lastname,
            dob: request.body.dob,
            gender: request.body.gender,

          
             email: request.body.email,
            phone: request.body.phnNo+request.body.phnNo1,
           
            city: request.body.city,
            location: request.body.location,
            password: request.body.password
         
}
          doctor_model.updateDoctor(data, function(status){
            if(status)
            {
              doctor_model.updateDoctorLog(data, function(status){
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

*/

/*

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

*/










module.exports = router;