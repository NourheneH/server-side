var config = require('../../../config');

var Mongoose    =   require("mongoose");
Mongoose.connect(config.database);
//Mongoose.secret('superSecret','proxymit2017');


// create instance of Schema
var mongoSchema =   Mongoose.Schema;
// create schema
var userSchema  = mongoSchema({
    email : String,
    password : String,
    name: String,
    surname: String,
    confirm: String,
    "isAdmin": false,
 
});

// create model if not exists.
var User = Mongoose.model('User',userSchema);

module.exports ={
  User :User,
}
