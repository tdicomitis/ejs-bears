var express = require("express");
var Cat = require('../models/cat');
var Router = new express.Router();


Router.get('/', function(req, res){
  Cat.find(function(err, data){
    if(err){
      console.log("Error finding your cat!")
    }else{
      res.json(data)
    }
  })
});

Router.post('/', function(req, res){

  var newCat= new Cat();
  newCat.name=req.body.name;
  newCat.talent=req.body.talent;
  newCat.age=req.body.age;

  console.log(newCat);

  newCat.save(function(err, data){
    if(err){
      console.log(err);
    }else{
      res.json(data);
    }
  })
});

Router.get('/:cat_id', function(req, res){
  Cat.findById(req.params.cat_id, function(err, data){
    if(err){
      console.log(err)
      } else {
        res.json(data)
    }
  });
});

Router.delete('/cat_id', function(req, res){
  Cat.remove({ _id: req.params.cat_id }, function (err){
    if(err){
      console.log(err)
    } else {
      res.json({ message: "Successfully deleted the cat" })
    }
  });
});

Router.put('/:cat_id', function(req, res){
  Cat.findById(req.params.cat_id, function(err, cat){
    if(err){
      console.log(err)
    } else {
      cat.name = req.body.name ? req.body.name : cat.name;
      cat.talent = req.body.talent ? req.body.talent : cat.talent;
      cat.age = req.body.age ? req.body.age : cat.age;

      bear.save(function(er, updatedCat){
        if(er){
          console.log(er)
        } else {
          res.json(updatedCat);
        }
      });

    }
  });
});

module.exports = Router
