var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Cat = require('./models/cat');
var bearRouter = require('./routes/bears');

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


app.use('/api/bears', bearRouter);

var server = app.listen(3000, function() {
  console.log('Server 🔥🔥🔥ed up on PORT 3000')
});
