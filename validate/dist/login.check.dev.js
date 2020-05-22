"use strict";

var low = require("lowdb");

var FileSync = require("lowdb/adapters/FileSync");

var adapter = new FileSync("db.json");
var db = low(adapter);

var express = require("express");

var app = express();

var User = require("../user.model");

var mongoose = require("mongoose");

var ObjectId = require("mongodb").ObjectID;

module.exports.loginCheck = function _callee(req, res, next) {
  var user, errors;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(User.find({
            name: req.body.name
          }));

        case 2:
          user = _context.sent;
          user = user[0];
          errors = [];

          if (!(user === undefined)) {
            _context.next = 8;
            break;
          }

          errors.push("User doesn't exist.");
          return _context.abrupt("return", res.render("./login", {
            error: errors,
            value: req.body.name
          }));

        case 8:
          if (!(req.body.name === user.name && req.body.password === user.password)) {
            _context.next = 13;
            break;
          }

          res.cookie("id", user._doc._id, {
            signed: true
          });
          app.locals.user1 = user;
          res.locals.user1 = app.locals.user1;
          return _context.abrupt("return", next());

        case 13:
          if (user.password !== req.body.password) {
            errors.push("Wrong password.");
          }

          if (!(errors !== [])) {
            _context.next = 16;
            break;
          }

          return _context.abrupt("return", res.render("./login", {
            error: errors,
            value: req.body.name
          }));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.logincheck_2 = function _callee2(req, res, next) {
  var errors, userMatched;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          errors = [];
          res.locals.user1 = app.locals.user1;

          if (!(req.signedCookies.id === undefined)) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.render("./login", {
            error: errors,
            value: req.body.name
          }));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(User.findById(req.signedCookies.id));

        case 6:
          userMatched = _context2.sent;
          console.log(req.signedCookies.id === userMatched.id);

          if ( // req.signedCookies.id === db.get("users").find({ id: req.signedCookies.id }).value().id
          req.signedCookies.id === userMatched.id) {
            next();
          }

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
};