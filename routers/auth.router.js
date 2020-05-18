var express = require('express')
var authRouter = express.Router()
var controller = require('../controller/user.controller')
var validate = require("../validate/validate")


authRouter.get("/login" ,controller.login)
authRouter.post("/login",validate.validate ,controller.index)

module.exports = authRouter