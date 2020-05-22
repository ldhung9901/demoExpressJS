"use strict";

var express = require('express');

var userRouter = express.Router();

var controller = require('../controller/user.controller');

var validate = require("../validate/validate");

var loginValidate = require("../validate/login.check");

userRouter.get('/', loginValidate.logincheck_2, controller.index);
userRouter.get('/search', loginValidate.logincheck_2, controller.search);
userRouter.get('/create', controller.create);
userRouter.post('/create', loginValidate.logincheck_2, controller.postCreate);
userRouter.post('/', loginValidate.logincheck_2, controller.postDeleted);
module.exports = userRouter;