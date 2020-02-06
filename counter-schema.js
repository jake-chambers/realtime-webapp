var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CounterSchema = new Schema({
  value: Number,
  name: String
});

module.exports = mongoose.model('counter', CounterSchema)