"use strict";var low=require("lowdb"),FileSync=require("lowdb/adapters/FileSync"),adapter=new FileSync("db.json"),db=low(adapter),shortid=require("shortid");db.defaults({users:[]}).write();var users=db.get("users").value();console.log(users);var express=require("express"),app=express(),router=express.Router(),controller=require("../controller/user.controller");module.exports={index:function(e,r){r.render("./users/index",{title:"Users",users:users})},search:function(r,e){var s=db.get("users").value().filter(function(e){return-1!==e.name.toLowerCase().indexOf(r.query.name)});console.log(r.query);var t=JSON.stringify(r.query.name);e.render("./users/index",{title:"Users Matched",users:s,input:t})},create:function(e,r){r.render("./users/newUser/newUser")},postCreate:function(e,r){db.get("users").push({id:shortid.generate(),name:e.body.name,password:e.body.password}).write(),r.redirect("/users")},postDeleted:function(e,r){db.get("users").remove({id:e.body.id}).write(),r.redirect("/users")},login:function(e,r){r.render("./login")}};