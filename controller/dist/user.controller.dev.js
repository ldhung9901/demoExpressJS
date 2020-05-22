"use strict";

var low = require("lowdb");

var FileSync = require("lowdb/adapters/FileSync");

var adapter = new FileSync("db.json");
var db = low(adapter);

var shortid = require("shortid");

var User = require('../user.model');

var mongoose = require('mongoose');

var ObjectId = require('mongodb').ObjectID;

db.defaults({
  users: []
}).write();

var express = require("express");

var app = express();
var router = express.Router();

var controller = require("../controller/user.controller");

module.exports = {
  index: function index(req, res) {
    var users;
    return regeneratorRuntime.async(function index$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(User.find());

          case 2:
            users = _context.sent;
            res.locals.user1 = app.locals.user1;
            res.render("./users/index", {
              title: "Users",
              users: users,
              id: req.signedCookies.id
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  reIndex: function reIndex(req, res) {
    res.locals.user1 = app.locals.user1;
    res.redirect('/users');
  },
  search: function search(req, res) {
    var user_data, matchedUsers, reqStr;
    return regeneratorRuntime.async(function search$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            res.locals.user1 = app.locals.user1;
            _context2.next = 3;
            return regeneratorRuntime.awrap(User.find());

          case 3:
            user_data = _context2.sent;
            matchedUsers = user_data.filter(function (user) {
              return user.name.toLowerCase().indexOf(req.query.name) !== -1;
            });
            console.log(req.query);
            reqStr = JSON.stringify(req.query.name);
            res.render("./users/index", {
              title: "Users Matched",
              users: matchedUsers,
              input: reqStr
            });

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  create: function create(req, res) {
    res.locals.user1 = app.locals.user1;
    res.render("./users/newUser/newUser");
  },
  postCreate: function postCreate(req, res) {
    res.locals.user1 = app.locals.user1;
    var avatar = req.file.path.split("\\").slice(1).join("/");
    console.log(avatar); // db.get("users")
    //   .push({
    //     id: shortid.generate(),
    //     name: req.body.name,
    //     password: req.body.password,
    //     avatar: avatar,
    //   })
    //   .write();

    User.create({
      _id: ObjectId(),
      name: req.body.name,
      password: req.body.password,
      avatar: avatar
    });
    res.redirect("/users");
  },
  postDeleted: function postDeleted(req, res) {
    return regeneratorRuntime.async(function postDeleted$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            res.locals.user1 = app.locals.user1; // db.get("users").remove({ id: req.body.id }).write();

            _context3.next = 3;
            return regeneratorRuntime.awrap(User.deleteOne({
              _id: ObjectId(req.body.id)
            }));

          case 3:
            res.redirect("/users");

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    });
  },
  login: function login(req, res) {
    res.locals.user1 = app.locals.user1;
    res.render("./login");
  },
  logout: function logout(req, res) {
    res.cookie("id", {
      expires: Date.now()
    });
    res.redirect("/users");
  }
};