const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const shortid = require("shortid");
db.defaults({product: [] }).write();
var express = require("express");
const app = express();
var Product = require('../product.model')

module.exports = {

  product:  async function (req, res) {
    var page = req.query.page || 1;
    var perPage = 8;
    var start = (page-1)*perPage;
    var end = page*perPage;
    var products = await Product.find()
    var pageNext= parseInt(parseInt(page) + 1);
    var pagePrevious= page - 1; console.log(pageNext)
    var newProduct = products.slice(start,end)
    res.render("./product", { title: "product", products: newProduct, page: page,
    pagePrevious: pagePrevious, pageNext: pageNext });

  },
};
