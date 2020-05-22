const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const express = require("express");
const app = express();
var User = require("../user.model");
const mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectID;
module.exports.loginCheck = async function (req, res, next) {
  // db.read()
  // var user = db.get("users").find({ name: req.body.name });
  var user = await User.find({ name: req.body.name });
  user = user[0];
  var errors = [];

  if (user === undefined) {
    errors.push("User doesn't exist.");
    return res.render("./login", {
      error: errors,
      value: req.body.name,
    });
  }
  if (req.body.name === user.name && req.body.password === user.password) {
    res.cookie("id", user._doc._id, { signed: true });

    app.locals.user1 = user;
    res.locals.user1 = app.locals.user1;

    return next();
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
module.exports.logincheck_2 = async function (req, res, next) {
  var errors = [];

  res.locals.user1 = app.locals.user1;
  if (req.signedCookies.id === undefined) {
    return res.render("./login", {
      error: errors,
      value: req.body.name,
    });
  }
  var userMatched = await User.findById(req.signedCookies.id);
  
  console.log(req.signedCookies.id === userMatched.id)

  if (
    // req.signedCookies.id === db.get("users").find({ id: req.signedCookies.id }).value().id

    req.signedCookies.id === userMatched.id
  ) {
    next();
  }
};
