
var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var router      =   express.Router();
var monChap     =   require("../models/chapter");
//var jwt    = require('jsonwebtoken');
var chapter = monChap.Chapter;

var mon = require("../../topics/models/topic");
var Topic = mon.Topic;
var config = require('../../../config/config');


//var error = require("./connect")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));


//Get All Chapters 

    exports.get = function(req,res){
        var response = {};
        chapter.find(function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = err;
            } else {
                response = { data};
                }
            res.json(response);   
        });
    };

    //Add Chapter

exports.post =function(req,res){
        var db = new chapter();
        var response = {};
       // var tagId = ObjectId(req.params.id)
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
      //  db.userId = db._id;
        db.title = req.body.title;
         db.chapter_id = db._id;
         db.content = req.body.content;
        db.save(function(err,data){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
            if(err) {
                response = err;
            } else {
            Topic.update({_id: req.params.id}, {$push: {chapters: db._id}}, function(err,result) {
               // res.send(result);
               // response = { data};
            })
            response = { data};
            }
            //response = { data};
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