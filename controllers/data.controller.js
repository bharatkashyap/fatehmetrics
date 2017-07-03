require("rootpath")();
var express = require("express"),
    router = express.Router(),
    Data = require("models/data"),
    mongoose = require("mongoose"),
    config = require("config.json");


router.get("/get", getData);
router.get("/read", readData);

module.exports = router;

function getData(req, res)
  {

     var data = new Data({
       rpm: req.query.rpm,
       volt: req.query.volt
     });
     data.save(function(err, createdDataObj){
       if(err)
        throw err;
       else {
         res.send(createdDataObj);
       }
     });
    }

function readData(req, res)
  {
    Data.find(function(err, data){
      if (err)
        throw err;
      else {
        var date =
        res.send({
          data: data,
          time: data[data.length - 1]._id.getTimestamp().toLocaleString()
        })
          }
    })
  }
