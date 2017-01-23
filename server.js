

var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var router      =   express.Router();
var mongoOp     =   require("./models/mongo");
//var User = Mongoose.model('User');
//var Role = Mongoose.model('Role');
var User = mongoOp.User;
var Role = mongoOp.Role;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});

/*
    ****User***
 */
//Get All users
router.route("/users")
    .get(function(req,res){
        var response = {};
        User.find().populate('Role').exec(function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    });

    //Add user
    router.route("/user/:id")
.post(function(req,res){
        var db = new User();
       // var query = Role.findById(req.params.id);
        //var roleId = ObjectId(req.params.id);
        var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
        req.Role = Role;
        db.email = req.body.email; 
        // Hash the password using SHA1 algorithm.
        db.password = req.body.password;
        db.confirm = req.body.confirm;
      db.name= req.body.name;
        db.surname = req.body.surname; 
      //  db.admin = req.body.admin;

        db.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                Role.update(req.params.id,{$push: {users:db._id}},function(err,data){
                    if(err){
                          response = {"error" : true,"message" : "Error fetching data"};
                    }
                    else {
                        
                         response = {"error" : false,"message" : "Data added"};
                    }
                    res.json(response);
                });      
               response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
    });
router.route("/users/:email/:password")
    .get(function(req,res){
        var response = {}
        User.find(req.body.email,req.body.password,function(err,data){
            if(err){
                response={"error": true,"message":"Error adding data"};
            }
            else{
               response={"error":false, "message": data}; 
            }
            res.json(response);
        });
    });
//Get user by id:
router.route("/users/:id")
    .get(function(req,res){
        
        var response={};
        User.findById(req.params.id,function(err,data){
            if(err){
                response={"error": true,"message":"Error adding data"};
            }
            else{
                response={"error":false, "message": data};
            }
            res.json(response);
        });
    })
  .put(function(req,res){
        var response = {};
        // first find out record exists or not
        // if it does then update the record
        User.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
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
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                         
                        response = {"error" : false,"message" : "Data is updated for "+req.params.id};
                    }
                    res.json(response);
                })
            }
        });
    }) 
       .delete(function(req,res){
        var response = {};
        // find the data
        User.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                // data exists, remove it.
                User.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    });


    /*
        ****Role****
     */
    //Get All User
    router.route("/roles")
        .get(function(req,res){
            var response = {};
        Role.find().populate('users').exec({},function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
        })
        .post(function(req,res){
            var db = new Role();
            var response = {};
            db.type = req.body.type;
            db.save(function(err){
                if(err){
                    response ={"error": true, "message": "Error fetching data"};
                }
                Role.find().populate('users').exec({},function(err,data){
                    if(err){
                        response = {"error":  true,"message" : "Error fetching data"};
                    }
                    else{
                    response = {"error":false, "message": "data added"};
            
                res.json(response);
                }
                });
                
            });
        });
      router.route("/roles/id")
        .get(function(req,res){
            var response = {};
        Role.findById(req.params.id).populate('users').exec({},function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
        });
    

app.use('/',router);

app.listen(3000);
console.log("Listening to PORT 3000");