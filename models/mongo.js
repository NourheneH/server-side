var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/db_proxym');

// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = {
    "email" : String,
    "password" : String,
    "name": String,
    "surname": String,
    "confirm": String,
    "isAdmin": Boolean,
 
};
var roleSchema = {
    "type": String,

};
// create model if not exists.
var User = mongoose.model('User',userSchema);
var Role = mongoose.model('Role',roleSchema);

module.exports ={
  User :User,
  Role :Role,
}
