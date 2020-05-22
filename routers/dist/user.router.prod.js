"use strict";var express=require("express"),userRouter=express.Router(),controller=require("../controller/user.controller"),validate=require("../validate/validate"),loginValidate=require("../validate/login.check");userRouter.get("/",loginValidate.logincheck_2,controller.index),userRouter.get("/search",loginValidate.logincheck_2,controller.search),userRouter.get("/create",controller.create),userRouter.post("/create",loginValidate.logincheck_2,controller.postCreate),userRouter.post("/",loginValidate.logincheck_2,controller.postDeleted),module.exports=userRouter;