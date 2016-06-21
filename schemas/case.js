var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var caseSchema = new mongoose.Schema({
  name: {type: String, unique: true, required: true},
  imageLink: String,
  description: String,
  resume: String,
  money: Number
});

caseSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Case', caseSchema);
