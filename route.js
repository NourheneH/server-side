
var express = require("express");
var router = express();
var user = require("./modules/users/controllers/user");

//app.set('superSecret', mongoOp.secret);

module.exports = router;
router.get("/users", user.get)
router.post("/user", user.post);
router.get("/users/:email/:password", user.getByElement);
router.get("/users/:email", user.getByEmail);
router.get("/users/:id", user.getById);
router.put("/users/:id", user.put);
router.delete("/users/:id", user.delete);
router.post("/authenticate", user.login);
