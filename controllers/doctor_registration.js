var express = require('express');
var reg = require('../models/doctor_reg_model');
var router = express.Router();

router.get('/', function(request, response){
    response.render('doctor_registration/index');
});

router.post('/', function(request, response){
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

            designation: request.body.designation,
            phone: request.body.phnNo+request.body.phnNo1,
            email: request.body.email,
            city: request.body.city,
            location: request.body.location,
            password: request.body.password,
            pic: uploadpath
        };
        reg.insert(doctor, function(status){
            if(status)
            {
              var log = {
                email: request.body.email,
                password: request.body.password,
                type: 4
              }
              reg.insertLog(log, function(status){
                if(status)
                {
                  response.redirect('/login');
                }
                else
                {
                  response.send('Error Log');
                }
              });
              
            }
            else
            {
              response.send('Error Registration');
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