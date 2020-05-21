const express = require('express')
var bodyParser = require('body-parser')
var userRouter = require('./routers/user.router')
var authRouter = require('./routers/auth.router')
// parse application/json
var cookieParser = require('cookie-parser')
var loginValidate = require("./validate/login.check")
var product = require('./routers/product.router')


const app = express();
const port = 3000;
const pug = require('pug');


var multer  = require('multer')
var upload = multer({ dest: './public/upload' })

app.use(cookieParser('sdfsdfsdf23'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/auth', authRouter)
app.use('/users', upload.single('avatar'),loginValidate.logincheck_2, userRouter)
app.use('/product', product)
app.set('view engine', 'pug')


app.get('/', function (req, res) {
    res.render('index', { title: 'Welcome' })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


