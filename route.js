
var express     =   require("express");
var router        =   express();
 var user = require("./modules/users/controllers/user");

//app.set('superSecret', mongoOp.secret);

module.exports = router;
router.get("/users",user.get)
router.post("/user",user.post);
router.get("/users/:email/:password",user.getByElement);
router.get("/users/:email", user.getByEmail);
router.get("/users/:id",user.getById);
router.put("/users/:id",user.put);
router.delete("/users/:id", user.delete);
router.post("/authenticate",user.login);
//app.post("/authenticate", user.login);
//router.get("/users", verifyToken.use);
 /*
// required for passport
app.use(session({
    secret: 'proxym session', // session secret
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, //  connection is considered secure only if there is a direct TLS/SSL connection.
        maxAge: 3600000 // 1 hour session expiration timeout
    }
}));*/