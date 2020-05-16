const express = require('express')
var bodyParser = require('body-parser')

// parse application/json


const app = express()
const port = 3000
const pug = require('pug');
app.set('view engine', 'pug')
var users = [
    { id: 1, name: 'Hung' },
    { id: 2, name: 'Dung' },
    { id: 3, name: 'Uyen' },
]
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.render('index', { title: 'Welcome' })
})
app.get('/users', function (req, res) {
    res.render('./users/index', { title: 'Users', users: users })
})
app.get('/users/search', function (req, res) {
    var matchedUsers = users.filter(user => {
        return user.name.toLowerCase().indexOf(req.query.name) !== -1;
    })
    var reqStr = JSON.stringify(req.query.name);
    res.render('./users/index', { title: 'Users', users: matchedUsers, input: reqStr })   
});
app.get('/users/create', function(req, res){
    res.render("./users/newUser/newUser");
   
});

app.post('/users/create', function(req, res){

    users.push(req.body);
    res.redirect('/users');
});



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

