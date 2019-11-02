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
        response.render('user/index',{user:result});
    });
    
});


module.exports = router;