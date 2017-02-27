var config = require('../../../config/config');
//var bcrypt   = require('bcrypt-nodejs');
var Mongoose = require("mongoose");
//Mongoose.connect(config.database);
//Mongoose.secret('superSecret','proxymit2017');


// create instance of Schema
var mongoSchema = Mongoose.Schema;
// create schema
var sectionSchema = mongoSchema({
  title : String,
  section_id : String, 
  content: String,
  img : String,
});

// create model if not exists.
var Section = Mongoose.model('Section', sectionSchema);

module.exports = {
  Section: Section
}
