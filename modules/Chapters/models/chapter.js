var config = require('../../../config/config');
//var bcrypt   = require('bcrypt-nodejs');
var Mongoose = require("mongoose");
//Mongoose.connect(config.database);
//Mongoose.secret('superSecret','proxymit2017');


// create instance of Schema
var mongoSchema = Mongoose.Schema;
// create schema
var chapterSchema = mongoSchema({
  title : String,
  chapter_id : String, 
  content : String,
  sections : [{ type: mongoSchema.Types.ObjectId, ref: 'Section' }]
});

// create model if not exists.
var Chapter = Mongoose.model('Chapter', chapterSchema);

module.exports = {
  Chapter: Chapter
}
