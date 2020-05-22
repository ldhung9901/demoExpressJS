const mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  description: String,
  img: String,
});

var Product = mongoose.model("Product", productSchema, "product");
console.log(Product)
module.exports = Product;
