const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const shortid = require("shortid");

db.defaults({ users: [] }).write();

var users = db.get("users").value();
console.log(users);
var express = require("express");

const app = express();
var router = express.Router();
var controller = require("../controller/user.controller");

module.exports = {
  index: function (req, res) {
    res.locals.user1 = app.locals.user1;
    res.render("./users/index", { title: "Users", users: users });
  },
  reIndex: function (req, res) {
    res.locals.user1 = app.locals.user1;
   res.redirect('/users')
  },
  search: function (req, res) {
    res.locals.user1 = app.locals.user1;
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
    res.locals.user1 = app.locals.user1;
    res.render("./users/newUser/newUser");
  },
  postCreate: function (req, res) {
    res.locals.user1 = app.locals.user1;
    var avatar = req.file.path.split("\\").slice(1).join("/");
    console.log(avatar);
    db.get("users")
      .push({
        id: shortid.generate(),
        name: req.body.name,
        password: req.body.password,
        avatar: avatar,
      })
      .write();
    res.redirect("/users");
  },
  postDeleted: function (req, res) {
    res.locals.user1 = app.locals.user1;
    db.get("users").remove({ id: req.body.id }).write();
    res.redirect("/users");
  },
  login: function (req, res) {
    res.locals.user1 = app.locals.user1;
    res.render("./login");
  },
};
