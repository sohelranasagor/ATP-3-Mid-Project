var express = require('express');
var router = express.Router();

router.get('/',function(request, response){
    request.session.email = "";
    request.session.lid = "";
    response.redirect('/login');
});

module.exports = router;