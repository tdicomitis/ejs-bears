#### EJS Bears

### Description
We are going to build an application which uses EJS to render different pages. The pages will be displaying 'bears'.
For example:

UI Routes:
/ => Home route, renders index.ejs
/viewBears => Will render an EJS page that displays all bears.
/post => this will render a form capable of creating a new bear.

#### Introducing MongoDB

1) Pre-req: install MongoDB:

`brew install mongodb`

2) Make the database in locally:

`mkdir =p /data/db` or `sudo mkdir =p /data/db`

3) Run MongoDB locally:

`mongod` or `sudo mongod`

----

MongoDB is a non-relational database. it is really nice for javascript developers because it stores data in formats that we are used to working with. A single piece of data is known as a document. In our application here is what a document will look like:

```js
var someBear = {
name: "Winnie The Pooh",
species: "Honey Bear",
color: "Golden Brown"
}
```
The above is a single document, a bunch of these documents, or bears, is known as a collection. A collection is just an array full of objects.
```js
var allBears = [someBear, anotherBear, moreBear]
```

When the EJS page to show all bears is rendered, it will be displaying actual data from our bears collection.

In order to be interactive with our database we will design a __RESTful__API__

API allows us to interact with our database.

The types of interactions we have with our database are described by __HTTP__verbs__.

Types of verbs:

#### GET
This verb is used for retrieving data.

#### POST
This verb is used to `create` a new piece of data.

#### PUT
This verb is used to edit.

#### DELETE
This verb is used to delete.

An API that implements all of these methods is known as a ### C.R.U.D. API. Because you have the ability to Create, Read, Update and Delete.

----

#### Mongoose

We will be implementing routes using express `app.get` to apply our HTTP verbs that interact with our database. Mongoose is a tool layered on top of Mongo, that makes these routes much easier to implement. It is known as a ORM (Object Relational Mapper).

A route that goes to our database, retrieves all bears, and sends these bear back in JSON would look like:

```js
app.get('/bears', function(req, res) {
  Bear.find(function(err, bear){
    if(err){
      return"error getting all bears from database"
      }else{
      res.json(bear)
    }
  });
```

#### Implementation

### Step 0: Project Setup

We will being by creating a basic server configured with express, ejs, and body parser.

`touch server.js`

`npm init` -> hit enter to accept defaults

We do not want to keep track of our node modules in GitHub, so we will tell git to ignore all these fiels.

`echo " node_modules/" >> .gitignore`

`npm install --save express body-parser ejs`

After you run install, make sure you look at `package.json` to see if your dependencies were updated.

Configure your server to create a basic express server, tel it to use the view engine ejs, and apply the body-parser middleware to your application.

```js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.set('view engine', 'ejs');

var server = app.listen(3000, function() {
  console.log('Server 🔥🔥🔥ed up on PORT 3000')
});
```

Ensure that it is functional before committing  your code: `nodemon server.js`

----

### Step One: EJS pages

In this set up we will make the appropriate EJS files, and make routes to serve these files.

Remember that EJS pages much live in the views folder, create pages for index, view and post.

`mkdir views`

`touch views/index.ejs touch views/view.ejs touch views/post.ejs `

Update each EJS page to have a basic HTML implementation. In `view.ejs` add some HTML for an unordered list. THis is wher eour bears will eventually go. In `post.ejs` add a basic HTML form with input fields for bear name, species, and color.

Next we will define our routes that are responsible for serving each on of our ejs pages.

```js
app.get('/', function(req, res){
  res.render('index');
});
app.get('/view', function(req, res){
  res.render('view');
});
app.get('/post', function(req, res){
  res.render('post');
});
```

Make sure you test your endpoints before committing your code.

### Step Two: Design our API

Before we can create and save any data in our database, we need to define what our data will look like. WE are going to use something called "Schema", which will be used as a blueprint when creating new bears.

Follow this example:

Install Mongoose:

`npm install --save mongoose`

Then:

`mkdir models`

Then:

`touch models/bears.js`

Then define file:

```js
//modles.bears.js
```

Lastly, import this file into `server.js`:

`var Bear = reqiuire('./models/bear');`

The last thing we need to do before designing our database API, is to require and configure our database in `server.js`

```js
var mongoose = require('mongoose');
mongoose.connect("mongobd://locatlhost/mis-ejs-bears");
```

We now need to design our API, as a way to interact with our database.

API implementation will follow this table:

| HTTP Verb     | Path          | Response  |
| ------------- |:-------------:| -----:|
| `GET`         | /api/bears    | responds with all bears in a our database |
| `POST`        | /api/bears    |   creates a new bear, responds with JSON of this bear |
| `GET`          | /api/bears/:bear_id      |    responds with JSON for the specific bear|
| `PUT`          | /api/bears/:bear_id      |    edit ability for specific bear|
| `DELETE`          | /api/bears/:bear_id      |    deletes a specific bear |

Let's implement the first two routes on this table:

```js
app.get('/api/bears', function(req, res){
  Bear.find(function(err, data){
    if(err){
      console.log(Error finding your bear!)
    }else{
      res.json(beardata)
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

```

Next we will use __Postman__ to test these two endpoints. Test your `GET` method first, it will break if you have an error in your code, otherwise it will return an empty array.

Then test the `POST` route (don't forget to select the URL encoded option).

After you create a couple of items, test your `GET` method again.
