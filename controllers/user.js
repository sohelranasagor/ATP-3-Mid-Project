var express = require('express');
var user = require('../models/user_model');
var router = express.Router();

router.get('*', function(request, response, next){
    if(request.session.email != ""){
		next();
	}else{
		response.redirect('/logout');
	}
    
});

router.get('/',function(request, response){
    user.getInfo(request.session.email,function(result){ 
        if(result)
        {
          user.getAllPhoto(function(results){
            if(results)
            {
                response.render('user/index',{user:result,photo:results});
            }
          });
          
        }     
       
    });
    
});

router.get('/abouthospital',function(request, response){   
        response.render('user/abouthospital');   
});

router.get('/contactus',function(request, response){   
    response.render('user/contactus');   
});

router.get('/department',function(request, response){   
    response.render('user/department');   
});

router.get('/news',function(request, response){   
    response.render('user/news');   
});

router.get('/narses',function(request, response){   
    response.render('user/narses');   
});

router.get('/noticebord',function(request, response){   
    response.render('user/noticebord');   
});

router.get('/gallery',function(request, response){    
  user.getAllPhoto(function(results){
    if(results)
    {
        response.render('user/gallery',{photo:results});
    }
  });   
});
router.get('/userprofile',function(request, response){ 
    user.getInfo(request.session.email, function(result){
        response.render('user/userprofile',{user:result});
    });  
       
});

router.get('/editprofile/:id',function(request,response){
    user.getInfo(request.session.email,function(result){
        response.render('user/editprofile',{user:result});
    });
});

router.get('/deleteprofile/:id',function(request,response){
    user.deleteuser(request.params.id,function(result){
       if(result){
        response.redirect('/login');
       }
    });
});

router.get('/doctorlist',function(request,response){
    user.getAllDoctor(function(result){
        response.render('user/doctorlist',{users:result});
    });
});


router.post('/editprofile/:id',function(request,response){
    var data = {
        id: request.params.id,
        fname:request.body.firstName,
        lname:request.body.lastname,
        dob:request.body.dob,
        city:request.body.city,
        location:request.body.location
    }
    user.updateUser(data,function(status){
        if(status){
            response.redirect('/user/userprofile');
        }
    });
});
  

module.exports = router;