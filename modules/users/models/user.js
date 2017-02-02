var config = require('../../../config/config');
//var bcrypt   = require('bcrypt-nodejs');
var Mongoose    =   require("mongoose");
Mongoose.connect(config.database);
//Mongoose.secret('superSecret','proxymit2017');


// create instance of Schema
var mongoSchema =   Mongoose.Schema;
// create schema
var userSchema  = mongoSchema({
    email : String,
    password : String,
    firstname: String,
    lastname: String,
    confirm: String,
    isAdmin: false,
 
});
/*
// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};*/
userSchema.methods.validPassword = function(password) {
  return (this.password = password);
};

// create model if not exists.
var User = Mongoose.model('User',userSchema);

module.exports ={
  User :User,
}
