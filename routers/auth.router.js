var express = require('express')
var authRouter = express.Router()
var controller = require('../controller/user.controller')
var validate = require("../validate/validate")
var loginValidate = require("../validate/login.check")

authRouter.get("/login" ,loginValidate.logincheck_2,controller.login)
authRouter.post("/login",validate.validate ,loginValidate.loginCheck,controller.reIndex)
authRouter.get("/logout" ,loginValidate.logincheck_2,controller.logout)
module.exports = authRouter
