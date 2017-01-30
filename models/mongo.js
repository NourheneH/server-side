//var config = require('./config');

var Mongoose    =   require("mongoose");
Mongoose.connect('mongodb://localhost:27017/db_proxym');
//Mongoose.secret('superSecret','proxymit2017');


// create instance of Schema
var mongoSchema =   Mongoose.Schema;
// create schema
var userSchema  = mongoSchema({
    Role: {type: Mongoose.Schema.Types.ObjectId , ref: 'Role'},
    email : String,
    password : String,
    name: String,
    surname: String,
    confirm: String,
    "isAdmin": false,
 
});

// create model if not exists.
var User = Mongoose.model('User',userSchema);
//var Role = Mongoose.model('Role',roleSchema);

module.exports ={
  User :User,
 // Role :Role,
}
