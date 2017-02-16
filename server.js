var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Bear = require('./models/bear');
var Cat = require('./models/cat');

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/mis-ejs-bears");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index');
});
app.get('/view', function(req, res){
  res.render('view');
});
app.get('/post', function(req, res){
  res.render('post');
});

//BEARS
app.get('/api/bears', function(req, res){
  Bear.find(function(err, data){
    if(err){
      console.log("Error finding your bear!")
    }else{
      res.json(data)
    }
  })
});

app.post('/api/bears', function(req, res) {

  var newBear= new Bear();
  newBear.name=req.body.name;
  newBear.species=req.body.species;
  newBear.color=req.body.color;

  console.log(newBear);

  newBear.save(function(err,data){
    if(err){
      console.log(err);
    } else {
      res.json(data);
      }
    })
  });

app.get('/api/bears/:bear_id', function(req, res){
  Bear.findById(req.params.bear_id, function(err, data){
    if(err){
      console.log(err)
      } else {
        res.json(data)
    }
  });
});

app.delete('/api/bears/:bear_id', function(req, res){
  Bear.remove({ _id: req.params.bear_id }, function (err){
    if(err){
      console.log(err)
    } else {
      res.json({ message: "Successfully deleted the bear"})
    }
  });
});

app.put('/api/bears/:bear_id', function(req, res){
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
      });

    }
  });
});

//CATS
app.get('/api/cats', function(req, res){
  Cat.find(function(err, data){
    if(err){
      console.log("Error finding your cat!")
    }else{
      res.json(data)
    }
  })
});

app.post('/api/cats', function(req, res){

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

app.get('/api/cats/:cat_id', function(req, res){
  Cat.findById(req.params.cat_id, function(err, data){
    if(err){
      console.log(err)
      } else {
        res.json(data)
    }
  });
});

app.delete('/api/cats/:cat_id', function(req, res){
  Cat.remove({ _id: req.params.cat_id }, function (err){
    if(err){
      console.log(err)
    } else {
      res.json({ message: "Successfully deleted the cat"})
    }
  });
});

app.put('/api/cats/:cat_id', function(req, res){
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


var server = app.listen(3000, function() {
  console.log('Server 🔥🔥🔥ed up on PORT 3000')
});
