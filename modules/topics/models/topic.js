var config = require('../../../config/config');
var tag = require('../../tags/models/tag');
//var bcrypt   = require('bcrypt-nodejs');
var Mongoose = require("mongoose");
//Mongoose.connect(config.database);
//Mongoose.secret('superSecret','proxymit2017');


// create instance of Schema
var mongoSchema = Mongoose.Schema;
// create schema
var topicSchema = mongoSchema({
  title : String,
  description : String,
  topic_id : String, 
  user : { type: mongoSchema.Types.ObjectId, ref: 'User'},
  tags : [{ type: mongoSchema.Types.String, ref: 'Tag'}],
  chapters : [{ type: mongoSchema.Types.ObjectId, ref: 'Chapter' }],

});

//mongoose.exports = mongoose.model('List', listSchema);
// create model if not exists.
var Topic = Mongoose.model('Topic', topicSchema);

module.exports = {
  Topic: Topic
}
