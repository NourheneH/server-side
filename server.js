

var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

 var user = require("./controllers/user");

app.get("/users",user.get)
app.post("/user",user.post);
app.get("/users/:email/:password",user.getByElement);
app.get("/users/:id",user.getById);
app.put("/user/:id",user.put);
app.delete("/user/:id", user.delete);

    app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});



app.listen(3000);
console.log("Listening to PORT 3000");