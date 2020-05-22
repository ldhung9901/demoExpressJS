"use strict";var low=require("lowdb"),FileSync=require("lowdb/adapters/FileSync"),adapter=new FileSync("db.json"),db=low(adapter),shortid=require("shortid"),User=require("../user.model"),mongoose=require("mongoose"),ObjectId=require("mongodb").ObjectID;db.defaults({users:[]}).write();var express=require("express"),app=express(),router=express.Router(),controller=require("../controller/user.controller");module.exports={index:function(r,s){var n;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(User.find());case 2:n=e.sent,s.locals.user1=app.locals.user1,s.render("./users/index",{title:"Users",users:n,id:r.signedCookies.id});case 5:case"end":return e.stop()}})},reIndex:function(e,r){r.locals.user1=app.locals.user1,r.redirect("/users")},search:function(r,s){var n,t,o;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return s.locals.user1=app.locals.user1,e.next=3,regeneratorRuntime.awrap(User.find());case 3:n=e.sent,t=n.filter(function(e){return-1!==e.name.toLowerCase().indexOf(r.query.name)}),console.log(r.query),o=JSON.stringify(r.query.name),s.render("./users/index",{title:"Users Matched",users:t,input:o});case 8:case"end":return e.stop()}})},create:function(e,r){r.locals.user1=app.locals.user1,r.render("./users/newUser/newUser")},postCreate:function(e,r){r.locals.user1=app.locals.user1;var s=e.file.path.split("\\").slice(1).join("/");console.log(s),User.create({_id:ObjectId(),name:e.body.name,password:e.body.password,avatar:s}),r.redirect("/users")},postDeleted:function(r,s){return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return s.locals.user1=app.locals.user1,e.next=3,regeneratorRuntime.awrap(User.deleteOne({_id:ObjectId(r.body.id)}));case 3:s.redirect("/users");case 4:case"end":return e.stop()}})},login:function(e,r){r.locals.user1=app.locals.user1,r.render("./login")},logout:function(e,r){r.cookie("id",{expires:Date.now()}),r.redirect("/users")}};