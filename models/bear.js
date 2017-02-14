var mongoose = require('mongoose');

var BearSchema = new mongoose.Schema({
  name: String,
  color: String,
  species: String,
})

module.exports = mongoose.model('Bear', BearSchema)
