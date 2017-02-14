var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Bear = require('./models/bear');

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


var server = app.listen(3000, function() {
  console.log('Server 🔥🔥🔥ed up on PORT 3000')
});
