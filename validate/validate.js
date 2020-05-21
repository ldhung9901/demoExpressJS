
var bodyParser = require('body-parser')
const express = require('express')
const app = express();
var router = express.Router();
module.exports.validate = function (req, res,next) {
    res.locals.user1=app.locals.user1;
    var errors = [];
    if (!req.body.name) {
        errors.push("Enter name.");
    }
    if (!req.body.password) {
        errors.push("Enter password.");
    }
    if (errors.length > 0) {
        return res.render("./login", {
            error: errors,
            value: req.body.name
        })}
    else {next()};
    

} 