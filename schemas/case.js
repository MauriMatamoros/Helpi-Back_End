var mongoose = require('mongoose');

var caseSchema = new mongoose.Schema({
  nombre: String,
  imageLink: String,
  description: String,
  donantes: [String],
  money: Number
});

module.exports = mongoose.model('Case', caseSchema);
