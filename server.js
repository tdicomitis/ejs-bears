var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var bearRouter = require('./routes/bears');
var catRouter = require('./routes/cats');


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

app.use('/api/bears', bearRouter);
app.use('/api/cats', catRouter);

var server = app.listen(3000, function() {
  console.log('Server 🔥🔥🔥ed up on PORT 3000')
});
