var express = require('express');
var login = require('../models/login_model');
var router = express.Router();

router.get('/', function(request, response){
    response.render('login/index');
});


router.post('/', function(request, response){

    request.checkBody('email', 'Email field cannot be empty.').notEmpty();
    request.checkBody('password', 'Password field cannot be empty.').notEmpty();

	const err = request.validationErrors();

	if(err){		
		response.render('login/index', {errors: err});
	}else{
		var user = {
            email: request.body.email,
            password: request.body.password
        }
        login.validate(user, function(result){
            if(result)
            {;
                if(result.type==1)
                {
                    request.session.email=request.body.email;
                    request.session.lid=result.logid;
                    response.redirect('/admin');
                }
                else if(result.type==2)
                {
                    request.session.email=request.body.email;
                    request.session.lid=result.logid;
                    response.redirect('/doctor');
                }
                else if(result.type==3)
                {
                    request.session.email=request.body.email;
                    request.session.lid=result.logid;
                    response.redirect('/staff');
                }
                else if(result.type==4)
                {
                    request.session.email=request.body.email;
                    request.session.lid=result.logid;
                    response.redirect('/user');
                }
                else
                {
                    response.send("invalid email/password");
                }
            }
            else
            {
                response.redirect('/login');
            }
        });
	}
    
});

module.exports = router;