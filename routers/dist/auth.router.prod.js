"use strict";var express=require("express"),authRouter=express.Router(),controller=require("../controller/user.controller"),validate=require("../validate/validate"),loginValidate=require("../validate/login.check");authRouter.get("/login",loginValidate.logincheck_2,controller.login),authRouter.post("/login",validate.validate,loginValidate.loginCheck,controller.index),module.exports=authRouter;