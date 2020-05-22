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

var Product = require('../product.model');

module.exports = {
  product: function product(req, res) {
    var page, perPage, start, end, products, pageNext, pagePrevious, newProduct;
    return regeneratorRuntime.async(function product$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            page = req.query.page || 1;
            perPage = 8;
            start = (page - 1) * perPage;
            end = page * perPage;
            _context.next = 6;
            return regeneratorRuntime.awrap(Product.find());

          case 6:
            products = _context.sent;
            pageNext = parseInt(parseInt(page) + 1);
            pagePrevious = page - 1;
            console.log(pageNext);
            newProduct = products.slice(start, end);
            res.render("./product", {
              title: "product",
              products: newProduct,
              page: page,
              pagePrevious: pagePrevious,
              pageNext: pageNext
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};