var config = require('../../../config/config');
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
  chapters : [{ type: mongoSchema.Types.ObjectId, ref: 'Chapter' }]
});

// create model if not exists.
var Topic = Mongoose.model('Topic', topicSchema);

module.exports = {
  Topic: Topic
}
