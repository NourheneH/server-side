var config = require('../../../config/config');
//var bcrypt   = require('bcrypt-nodejs');
var Mongoose = require("mongoose");
//Mongoose.connect(config.database);
//Mongoose.secret('superSecret','proxymit2017');


// create instance of Schema
var mongoSchema = Mongoose.Schema;
// create schema
var tagSchema = mongoSchema({
  
  name : String,
  description : String,
  tagId : String, 
  topics : [{ type: mongoSchema.Types.ObjectId, ref: 'topics' }]
});

// create model if not exists.
var Tag = Mongoose.model('Tag', tagSchema);

module.exports = {
  Tag: Tag
}
