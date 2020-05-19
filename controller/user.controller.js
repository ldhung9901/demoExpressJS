const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const shortid = require("shortid");

db.defaults({ users: [] }).write();

var users = db.get("users").value();
console.log(users);
var express = require("express");
var router = express.Router();
var controller = require("../controller/user.controller");

module.exports = {
  index: function (req, res) {
    res.render("./users/index", { title: "Users", users: users });
  },
  search: function (req, res) {
    var user_data = db.get("users").value();
    var matchedUsers = user_data.filter((user) => {
      return user.name.toLowerCase().indexOf(req.query.name) !== -1;
    });
    console.log(req.query);
    var reqStr = JSON.stringify(req.query.name);
    res.render("./users/index", {
      title: "Users Matched",
      users: matchedUsers,
      input: reqStr,
    });
  },
  create: function (req, res) {
    res.render("./users/newUser/newUser");
  },
  postCreate: function (req, res) {
    db.get("users")
      .push({ id: shortid.generate(), name: req.body.name })
      .write();
    res.redirect("/users");
  },
  postDeleted: function (req, res) {
    console.log(req.body.id);
    db.get("users").remove({ id:req.body.id }).write();
    res.redirect("/users");
  },
  login: function (req, res){
      console.log(req.query)
      res.render("./login")
  }
};
