"use strict";

var express = require('express');

var router = express.Router();

var controller = require('../controller/user.controller');

var validate = require("../validate/validate");

router.get('/', controller.index);
router.get('/search', controller.search);
router.get('/create', controller.create);
router.post('/create', validate.validate, controller.postCreate);
module.exports = router;