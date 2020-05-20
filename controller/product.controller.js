const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const shortid = require("shortid");

db.defaults({product: [] }).write();

var product = db.get("product").value();
console.log(product[0].img);
var express = require("express");

const app = express();


module.exports = {

  product: function (req, res) {
    res.render("./product", { title: "product", img: product[0].img});
  },
};
