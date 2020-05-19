"use strict";

var low = require("lowdb");

var FileSync = require("lowdb/adapters/FileSync");

var adapter = new FileSync("db.json");
var db = low(adapter);

var shortid = require("shortid");

db.defaults({
  users: []
}).write();
var users = db.get("users").value();
console.log(users);

var express = require("express");

var app = express();
var router = express.Router();

var controller = require("../controller/user.controller");

module.exports = {
  index: function index(req, res) {
    res.render("./users/index", {
      title: "Users",
      users: users
    });
  },
  search: function search(req, res) {
    var user_data = db.get("users").value();
    var matchedUsers = user_data.filter(function (user) {
      return user.name.toLowerCase().indexOf(req.query.name) !== -1;
    });
    console.log(req.query);
    var reqStr = JSON.stringify(req.query.name);
    res.render("./users/index", {
      title: "Users Matched",
      users: matchedUsers,
      input: reqStr
    });
  },
  create: function create(req, res) {
    res.render("./users/newUser/newUser");
  },
  postCreate: function postCreate(req, res) {
    db.get("users").push({
      id: shortid.generate(),
      name: req.body.name,
      password: req.body.password
    }).write();
    res.redirect("/users");
  },
  postDeleted: function postDeleted(req, res) {
    db.get("users").remove({
      id: req.body.id
    }).write();
    res.redirect("/users");
  },
  login: function login(req, res) {
    res.render("./login");
  }
};