//DECLARATION
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var expSession = require('express-session');
var upload = require('express-fileupload');
var registration = require('./controllers/registration');
var login = require('./controllers/login');
var logout = require('./controllers/logout');
var admin = require('./controllers/admin');
var staff = require('./controllers/staff');
var doctor = require('./controllers/doctor');

//for user
var user = require('./controllers/user');
var userwl = require('./controllers/userwl');
/*var abouthospital = require('./controllers/user/abouthospital');
var news = require('./controllers/user/news');
var department = require('./controllers/user/department');
var narses = require('./controllers/user/narses');
var narses = require('./controllers/user/gallery');
var narses = require('./controllers/user/contactus');
var narses = require('./controllers/user/noticebord');*/
var app = express();


//CONFIGURATION
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended:true}));
app.use(expSession({secret:'my top secret value',saveUninitialized:true,resave:false}));
app.use('/CSS', express.static('CSS'));
app.use('/uploads', express.static('uploads'));
app.use(upload());
app.use('/registration', registration);
app.use('/login', login);
app.use('/user', user);
app.use('/logout', logout);
app.use('/admin', admin);
app.use('/staff', staff);
app.use('/doctor', doctor);
app.use('/notregisteruser', userwl);

//ROUTER

//SERVER STARTUP
app.listen(3000,function(){
    console.log('server started at 3000...');
});