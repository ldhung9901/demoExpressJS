"use strict";

var express = require('express');

var userRouter = express.Router();

var controller = require('../controller/user.controller');

var validate = require("../validate/validate");

var loginValidate = require("../validate/login.check");

userRouter.get('/', controller.index);
userRouter.get('/search', controller.search);
userRouter.get('/create', controller.create);
userRouter.post('/create', controller.postCreate);
userRouter.post('/', controller.postDeleted);
module.exports = userRouter;