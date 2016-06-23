var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var tableSchema = new mongoose.Schema({
  name: String,
  donors: [{type: String, unique: true}],
  case: {type: String, unique: true, required: true}
});

tableSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Table', tableSchema);
