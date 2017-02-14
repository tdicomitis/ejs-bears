#### EJS Bears

### Description
We are going to build an application which uses EJS to render different pages. The pages will be displaying 'bears'.
For example:

UI Routes:
/ => Home route, renders index.ejs
/viewBears => Will render an EJS page that displays all bears.
/post => this will render a form capable of creating a new bear.

#### Introducing MongoDB

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
   }):
 ```

### tools

### commit our changes over time

___Learning to Node, Mongo, Mongoose, Express, and EJS___
