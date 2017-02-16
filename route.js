
var express = require("express");
var router = express();
var user = require("./modules/users/controllers/user");

//app.set('superSecret', mongoOp.secret);

module.exports = router;
router.get("/users", user.get)
router.post("/user", user.post);
router.get("/users/id/:id", user.getUserById);
router.get("/users/firstname/:firstname", user.getByElement);
router.get("/users/email/:email", user.getByEmail);
//router.get("/users/:firstname", user.getUserByName);
router.put("/users/edit/:id", user.put);
router.delete("/users/:id", user.delete);
router.post("/authenticate", user.login);
