//DECLARATION
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var expSession = require('express-session');
var upload = require('express-fileupload');
var exValidator = require('express-validator');
var registration = require('./controllers/registration');
var login = require('./controllers/login');
var user = require('./controllers/user');
var logout = require('./controllers/logout');
var admin = require('./controllers/admin');
var staff = require('./controllers/staff');
var doctor = require('./controllers/doctor');
var app = express();

//CONFIGURATION
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended:false}));
app.use(expSession({secret:'my top secret value',saveUninitialized:true,resave:false}));
app.use('/CSS', express.static('CSS'));
app.use(exValidator());
app.use('/uploads', express.static('uploads'));
app.use(upload());
app.use('/registration', registration);
app.use('/login', login);
app.use('/user', user);
app.use('/logout', logout);
app.use('/admin', admin);
app.use('/staff', staff);
app.use('/doctor', doctor);

//ROUTER

//SERVER STARTUP
app.listen(3000,function(){
    console.log('server started at 3000...');
});