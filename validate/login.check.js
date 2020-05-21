const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const express = require('express')
const app = express()

module.exports.loginCheck = function (req, res, next) {
  db.read()
  var user = db.get("users").find({ name: req.body.name });
  var errors = [];

  if (user.value() === undefined) {
    errors.push("User doesn't exist.");
    return res.render("./login", {
      error: errors,
      value: req.body.name,
    });
  }
  if (
    req.body.name === user.value().name &&
    req.body.password === user.value().password
  ) {
    res.cookie("id", user.value().id, {signed: true});
    
     
    app.locals.user1 = user.value();
    res.locals.user1 =app.locals.user1;
    
    return next()
  }

  if (user.password !== req.body.password) {
    errors.push("Wrong password.");
  }

  if (errors !== []) {
    return res.render("./login", {
      error: errors,
      value: req.body.name,
    });
  }
};
module.exports.logincheck_2 = function (req, res, next) {
  
  var errors = [];
  
res.locals.user1=app.locals.user1;
  if (req.signedCookies.id === undefined) {
    return res.render("./login", {
      error: errors,
      value: req.body.name,
    });
  }
  if (
    req.signedCookies.id === db.get("users").find({ id: req.signedCookies.id }).value().id
  ) {
    
    next();
  }
};
