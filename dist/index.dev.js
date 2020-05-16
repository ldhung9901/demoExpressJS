"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var router = require('./routers/user.router'); // parse application/json


var app = express();
var port = 3000;

var pug = require('pug');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/users', router);
app.set('view engine', 'pug');
app.get('/', function (req, res) {
  res.render('index', {
    title: 'Welcome'
  });
});
app.listen(port, function () {
  return console.log("Example app listening at http://localhost:".concat(port));
});