var mongoose = require('mongoose');

var caseSchema = new mongoose.Schema({
  name: String,
  imageLink: String,
  description: String,
  donors: [String],
  money: Number
});

module.exports = mongoose.model('Case', caseSchema);
