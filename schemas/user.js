var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  email: {type: String, index: true, required: true},
  cases:[String],
  scope: [String]
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
