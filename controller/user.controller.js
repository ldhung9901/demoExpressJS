
var express = require('express')
var router = express.Router()
var controller = require('../controller/user.controller')
var users = [
    { id: 1, name: 'Hung' },
    { id: 2, name: 'Dung' },
    { id: 3, name: 'Uyen' },
]

module.exports = {
    index: function (req, res) {
        res.render('./users/index', { title: 'Users', users: users })
    },
    search: function (req, res) {
        var matchedUsers = users.filter(user => {
            return user.name.toLowerCase().indexOf(req.query.name) !== -1;
        })
        var reqStr = JSON.stringify(req.query.name);
        res.render('./users/index', { title: 'Users', users: matchedUsers, input: reqStr })
    },
    create: function (req, res) {
        res.render("./users/newUser/newUser");

    },
    postCreate: function (req, res) {
            users.push(req.body);
            res.redirect('/users');
          
    }
}