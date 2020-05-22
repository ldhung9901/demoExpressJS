const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
 
  password: String,
  name: String,
  avatar: String,
});

var User = mongoose.model("User", userSchema, "users");

module.exports = User;
