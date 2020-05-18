var express = require('express')
var userRouter = express.Router()
var controller = require('../controller/user.controller')
var validate = require("../validate/validate")


userRouter.get('/', controller.index)
userRouter.get('/search', controller.search);
userRouter.get('/create', controller.create);userRouter
userRouter.post('/create', validate.validate,controller.postCreate);
userRouter.post('/',controller.postDeleted);
module.exports = userRouter