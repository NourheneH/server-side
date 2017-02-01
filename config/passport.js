
var passport = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var mongoOp     =   require("../modules/users/models/user");
var User = mongoOp.User;

/*
var jwt    = require('jsonwebtoken');
var config = require('./config');
*/

    //login user 
    module.exports = function(passport) {

       passport.serializeUser(function(user, done) {
        done(null, user);
    });
     passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

passport.use('local-login', new LocalStrategy ({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
},
   
function(req,email,password, done){
    if (email) {
       email = email.toLowerCase();
  }
  process.nextTick(function(){
      User.findOne({ 'email' :  email }, function(err, user) {

    if (err) { return done(err)};

    if (!user) {
      return done(null, {error: 'No user found'});
    } 
    if (!user.validPassword(password)) {
                    return done(null, { error: 'Oops! Wrong password.' });
   }
                // all is well, return user
                else {
                    return done(null, user);
}
  });
    });
  
}));


};



