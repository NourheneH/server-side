
var express = require("express");
var router = express();
var user = require("./modules/users/controllers/user");
var tag = require("./modules/tags/controllers/tag");
var topic = require ("./modules/topics/controllers/topic");
var chapter = require ("./modules/chapters/controllers/chapter");
var section = require("./modules/sections/controllers/section");
 
//app.set('superSecret', mongoOp.secret);

module.exports = router;

//Manage User
router.get("/users", user.get)
router.post("/user", user.post);
router.get("/users/id/:id", user.getUserById);
router.get("/users/firstname/:firstname", user.getByElement);
router.get("/users/email/:email", user.getByEmail);
//router.get("/users/:firstname", user.getUserByName);
router.put("/users/edit/:id", user.put);
router.delete("/users/:id", user.delete);
router.post("/authenticate", user.login);


//Manage Tags 
router.get("/tags", tag.get)
router.post("/tag", tag.post);
router.get("/tags/id/:id", tag.getTagById);
router.put("/tags/edit/:id", tag.put);
router.delete("/tags/:id", tag.delete);


//Manage Topics 
router.get("/topics", topic.get);
router.post("/topic/:id1", topic.post);
router.get("/topics/:id", topic.getTopicById);
//router.get("/topic/tag/:id", topic.getTagsByTopic);

//Manage Chapters
router.get("/chapters", chapter.get);
router.post("/chapter/:id", chapter.post);

//Manage Sections 
router.get("/sections", section.get);
router.post("/section/:id", section.post);