
var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var router      =   express.Router();
var mongoOp     =   require("../models/mongo");
var jwt    = require('jsonwebtoken');
var User = mongoOp.User;
//var error = require("./connect")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));
/*
    ****User***
 */
//Get All users

    exports.get = function(req,res){
        var response = {};
        User.find(function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = err;
            } else {
                response = { data};
                }
            res.json(response);   
        });
    };

    //Add user

exports.post =function(req,res){
        var db = new User();
        var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.

        db.email = req.body.email; 
        // Hash the password using SHA1 algorithm.
        db.password = req.body.password;
        db.confirm = req.body.confirm;
        db.name= req.body.name;
        db.surname = req.body.surname; 
        db.isAdmin = false;
    

        db.save(function(err,data){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
            if(err) {
                response = err;
            } else {
            response = {data};
            }
            res.json(response);
        });
    };

    exports.getByElement = function(req,res){
        var response = {}
        User.find({email:req.params.email,password:req.params.password},function(err,data){
            if(err){
                response= err;
            }
            else{
               response={data}; 
            }
            res.json(response);
        });
    };

//Get user by id:
    exports.getById =function(req,res){
        
        var response={};
        User.findById(req.params.id,function(err,data){
            if(err){
                response= err;
            }
            else{
                response={data};
            }
            res.json(response);
        });
    };
    //Upadte user
  exports.put = function(req,res){
        var response = {};
        // first find out record exists or not
        // if it does then update the record
        User.findById(req.params.id,function(err,data){
            if(err) {
                response = err ;
            } else {
            // we got data from Mongo.
            // change it accordingly.
                if(req.body.email !== undefined) {
                    // case where email needs to be updated.
                    data.email = req.body.email;
                }
                if(req.body.password !== undefined) {
                    // case where password needs to be updated
                    data.password = req.body.password;
                }
                 if(req.body.name !== undefined) {
                    // case where email needs to be updated.
                    data.name = req.body.name;
                }
                 if(req.body.surname !== undefined) {
                    // case where email needs to be updated.
                    data.surname = req.body.surname;
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
    
       exports.delete =function(req,res){
        var response = {};
        // find the data
        User.findById(req.params.id,function(err,data){
            if(err) {
                response = err;
            } else {
                // data exists, remove it.
                User.remove({_id : req.params.id},function(err){
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

    //login user 
    exports.login = function(req, res) {

  // find the user
  User.findOne({
    email: req.body.email
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user , 'proxymit',{
          expiresIn: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
};




