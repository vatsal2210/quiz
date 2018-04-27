/*
    Author : Vatsal Shah
    Date: 27th April, 2018
*/

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    path = require('path'),
    ip = require('ip'),
    moment = require('moment'),
    flash = require('connect-flash');

var constants = require('./util/constants.js');

var sqlite3 = require('sqlite3').verbose(),
    database = new sqlite3.Database('crowdbotics.db');

console.log("-------- Starting Crowboticsdev server --------  ", new Date());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());									
app.use(bodyParser.urlencoded({ extended: true }));	
app.use(express.static(path.join(__dirname, 'static')));
app.use(session({											
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  res.locals.ledStatus = req.ledStatus;
  next();
});

app.get('/', function (req, res) {
    res.redirect('/login');
});

var appContext = {};
appContext.app = app;
appContext.constants = constants;
appContext.sqliteDB = database;
appContext.moment = moment;

require('./routes/module.js')(appContext);

var host = ip.address();
var port = 8080;
server.listen(port, function () {
  console.log("Server is running at port ", host , ' port ', port);
});