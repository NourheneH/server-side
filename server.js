

var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var passport = require('passport');
var session = require('express-session');
var jwt    = require('jsonwebtoken'); 
 //var verifyToken = require("./config/config");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));


// required for passport
//app.use(require('./config/passport'));
//var passport = require("./config/passport") ({passport:passport});
app.use(session({
    secret: 'proxym session', // session secret
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, //  connection is considered secure only if there is a direct TLS/SSL connection.
        maxAge: 3600000 // 1 hour session expiration timeout
    }
}));
app.use(passport.initialize());
app.use(passport.session());




app.use(require('./route'));
app.use(require("./config/verifyToken"));





app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});



app.listen(3000);
console.log("Listening to PORT 3000");