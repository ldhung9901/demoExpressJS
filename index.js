const express = require('express')
var bodyParser = require('body-parser')
var userRouter = require('./routers/user.router')
var authRouter = require('./routers/auth.router')
// parse application/json





const app = express();
const port = 3000;
const pug = require('pug');



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/auth', authRouter)
app.use('/users', userRouter)

app.set('view engine', 'pug')


app.get('/', function (req, res) {
    res.render('index', { title: 'Welcome' })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


