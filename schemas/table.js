var mongoose = require('mongoose');

var tableSchema = new mongoose.Schema({
  name: String,
  donors: [String],
  case: String
});

module.exports = mongoose.model('Table', caseSchema);
