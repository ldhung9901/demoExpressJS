"use strict";var low=require("lowdb"),FileSync=require("lowdb/adapters/FileSync"),adapter=new FileSync("db.json"),db=low(adapter),express=require("express"),app=express(),User=require("../user.model"),mongoose=require("mongoose"),ObjectId=require("mongodb").ObjectID;module.exports.loginCheck=function(r,n,o){var s,a;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(User.find({name:r.body.name}));case 2:if(s=(s=e.sent)[0],a=[],void 0===s)return a.push("User doesn't exist."),e.abrupt("return",n.render("./login",{error:a,value:r.body.name}));e.next=8;break;case 8:if(r.body.name===s.name&&r.body.password===s.password)return n.cookie("id",s._doc._id,{signed:!0}),app.locals.user1=s,n.locals.user1=app.locals.user1,e.abrupt("return",o());e.next=13;break;case 13:if(s.password!==r.body.password&&a.push("Wrong password."),a!==[])return e.abrupt("return",n.render("./login",{error:a,value:r.body.name}));e.next=16;break;case 16:case"end":return e.stop()}})},module.exports.logincheck_2=function(r,n,o){var s,a;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:if(s=[],n.locals.user1=app.locals.user1,void 0===r.signedCookies.id)return e.abrupt("return",n.render("./login",{error:s,value:r.body.name}));e.next=4;break;case 4:return e.next=6,regeneratorRuntime.awrap(User.findById(r.signedCookies.id));case 6:a=e.sent,console.log(r.signedCookies.id===a.id),r.signedCookies.id===a.id&&o();case 9:case"end":return e.stop()}})};