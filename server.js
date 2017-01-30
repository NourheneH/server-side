

var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var jwt    = require('jsonwebtoken'); 
//var mongoOp     =   require("./models/mongo");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

 var user = require("./controllers/user");
 var apiRoute = require("./controllers/apiRoute");

//app.set('superSecret', mongoOp.secret);
app.use("/", apiRoute.use);
app.get("/users",user.get)
app.post("/user",user.post);
app.get("/users/:email/:password",user.getByElement);
app.get("/users/:id",user.getById);
app.put("/user/:id",user.put);
app.delete("/user/:id", user.delete);
app.post("/users/authenticate", user.login);

    app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});



app.listen(3000);
console.log("Listening to PORT 3000");