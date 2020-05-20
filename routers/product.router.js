var express = require('express')
var userRouter = express.Router()
var controller = require('../controller/product.controller')


userRouter.get('/',controller.product)
module.exports = userRouter