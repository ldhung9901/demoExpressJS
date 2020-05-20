"use strict";

var low = require("lowdb");

var FileSync = require("lowdb/adapters/FileSync");

var adapter = new FileSync("db.json");
var db = low(adapter);

var shortid = require("shortid");

db.defaults({
  product: []
}).write();

var express = require("express");

var app = express();
module.exports = {
  product: function product(req, res) {
    var page = req.query.page || 1;
    var perPage = 8;
    var start = (page - 1) * perPage;
    var end = page * perPage;
    var products = db.get("product").value().slice(start, end);
    var pageNext = parseInt(parseInt(page) + 1);
    var pagePrevious = page - 1;
    console.log(pageNext);
    res.render("./product", {
      title: "product",
      products: products,
      page: page,
      pagePrevious: pagePrevious,
      pageNext: pageNext
    });
  }
};