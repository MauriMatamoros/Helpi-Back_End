var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new mongoose.Schema({
  name: String,
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  cases:[String],
  scope: [String],
  profile_photo: String,
  provider: String
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
