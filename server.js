

var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var jwt    = require('jsonwebtoken'); 





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));
app.use(require('./route'));



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});



app.listen(3000);
console.log("Listening to PORT 3000");