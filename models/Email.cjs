const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  login: String,
  id: String,
  pass: String,
  expired: Boolean,
  visited: Boolean,
});

const User = mongoose.models.User || mongoose.model('User', userSchema)
module.exports = {
  User
};
