var express = require("express");
var Bear = require('../models/bear');
var Router = new express.Router();

Router.get('/', function(req, res){
 Bear.find(function(err, data){
   if(err){
     console.log("error finding your bear")
   } else {
     res.json(data)
   }
 })
});

Router.post('/', function(req, res){
 var newBear = new Bear();
 newBear.name = req.body.name;
 newBear.species = req.body.species;
 newBear.gender = req.body.gender;
 newBear.color = req.body.color;

 newBear.save(function(err, data){
   if(err){
     console.log(err)
   } else {
     res.json(data);
   }
 })
});

Router.get('/:bear_id', function(req, res){
 Bear.findById(req.params.bear_id, function(err, data){
   if(err){
     console.log(err)
   } else {
     res.json(data)
   }
 })
});

Router.delete('/:bear_id', function(req, res){
 Bear.remove({ _id: req.params.bear_id }, function(err){
   if(err){
     console.log(err)
   }else{
     res.json({ message: "successfully eradicated the bear" })
   }
 })
});

Router.put('/:bear_id', function(req, res){
 Bear.findById(req.params.bear_id, function(err, bear){
   if(err){
     console.log(err)
   } else {
     bear.name = req.body.name ? req.body.name : bear.name;
     bear.species = req.body.species ? req.body.species : bear.species;
     bear.color = req.body.color ? req.body.color : bear.color;

     bear.save(function(er, updatedBear){
       if(er){
         console.log(er)
       } else {
         res.json(updatedBear);
       }
     })
   }
 })
})

module.exports = Router
