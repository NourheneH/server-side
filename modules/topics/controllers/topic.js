
var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var router      =   express.Router();
var mon     =   require("../../tags/models/tag");
var mongoOp  = require("../models/topic");
var mongo = require("../../users/models/user");

var Tag = mon.Tag;
var Topic = mongoOp.Topic;
var User = mongo.User;

var config = require('../../../config/config');

//var error = require("./connect")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));


//Get All topics

    exports.get = function(req,res){
        var response = {};
        Topic.find(function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = err;
            } else {
                response = { data};
                }
            res.json(response);   
        });
    };

    //Add topic

exports.post =function(req,res){
        var db = new Topic();
        var response = {};
       // var tagId = ObjectId(req.params.id)
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
      //  db.userId = db._id;
        db.title = req.body.title;
        db.description = req.body.description;
         db.topicId = db._id;
         db.tags= req.body.tags;
         db.author = req.params.id1;
        db.save(function(err,data){
          /*  if(err) {
                return (err);
            } 
            else {
            db.get().populate('tags').exec(function(err, topics){
                if(err){
                    return(err)
                }
                response = { topics};
                res.json(response);
            })

            }  */
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
          if(err) {
                response = err;
            } else {
           User.update({_id: req.params.id1}, {$push: {topics: db._id}}, function(err, result){
               })
            Tag.update({_id: req.body.tags}, {$push: {topics: db._id}}, function(err,result) {
                })
        
             response = { data};
            }
             
               
              
            response = { data};
            res.json(response);
        });
    };
/*
 exports.getTagById = function(req,res){
        var response = {}
        //User.find({email:req.params.email,password:req.params.password},function(err,data){
           // User.find({userId:req.params.userId},function(err,data){
               Tag.findById(req.params.id, function(err,data){
            if(err){
                response= err;
            }
            else{
               response={data}; 
            }
            res.json(response);
        });
    };
   //Upadte tag
  exports.put = function(req,res){
        var response = {};
        // first find out record exists or not
        // if it does then update the record
        Tag.findById(req.params.id,function(err,data){
            if(err) {
                response = err ;
            } else {
            // we got data from Mongo.
            // change it accordingly.
                if(req.body.name !== undefined) {
                    // case where email needs to be updated.
                    data.name = req.body.name;
                }
                if(req.body.description !== undefined) {
                    // case where password needs to be updated
                    data.description = req.body.description;
                }
                // save the data
                data.save(function(err){
                    if(err) {
                        response = err;
                    } else {
                         
                        response = {data};
                    }
                    res.json(response);
                })
            }
        });
    }; 
    //delete tag 
       exports.delete =function(req,res){
        var response = {};
        // find the data
        Tag.findById(req.params.id,function(err,data){
            if(err) {
                response = err;
            } else {
                // data exists, remove it.
                Tag.remove({_id : req.params.id},function(err){
                    if(err) {
                        response =err;
                    } else {
                        response = {"message" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    };

*/