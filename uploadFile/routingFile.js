const router = require('express').Router();
const config = require('../config/config');
const mongoose = require("mongoose");
const fs = require("fs");

let Grid = require("gridfs-stream");
let conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
let gfs;


var mongoOp = require("../modules/users/models/user");
var User = mongoOp.User;


conn.once("open", () => {
    gfs = Grid(conn.db);
    router.get('/', (req, res) => {
      res.send('Hello Nourhene Hadhri !');
    
    });

 
    router.get('/img/:id', (req, res) => {
        gfs.files.find({
            id: req.params._id
        }).toArray((err, files) => {

            if (files.length === 0) {
                return res.status(400).send({
                    message: 'File not found'
                });
            }
            let data = [];
            let readstream = gfs.createReadStream({
                filename: files[0].filename
            });

            readstream.on('data', (chunk) => {
                data.push(chunk);
            });

            readstream.on('end', () => {
                data = Buffer.concat(data);
                let img = 'data:image/png;base64,' + Buffer(data).toString('base64');
                res.end(img);
            });

            readstream.on('error', (err) => {
                console.log('An error occurred!', err);
                throw err;
            });
        });
    });
    router.post('/img/:id/new', (req, res) => {
        let part = req.files.file[0];
        let writeStream = gfs.createWriteStream({
            filename: 'img_' + part.name,
            mode: 'w',
            content_type: part.mimetype
        });

        writeStream.on('close', (file) => {
            User.update({_id: req.params.id}, {$push : {image: file._id}}, function(err,result){
            res.send(result);
        })
            return res.status(200).send({
                message: 'Success',
                file: file
            });  
            
        });

        writeStream.write(part.data);

        writeStream.end();

        // User.update({_id: req.params.id}, {$push : {image: gfs.files._id}}, function(err,result){
        //     res.send(result);
        // }) 
    }); 
})


module.exports = router;