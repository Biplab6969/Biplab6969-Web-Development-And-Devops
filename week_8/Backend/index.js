const express = require("express");

const app = express();

app.post("/user/signup", function(req, res){
  res.json({
    message: "signup endpoint"
  })
})

app.post("/user/signin",function(req, res){
  res.json({
    message: "signin endpoint"
  })
})

app.get("/course", function(req, res){
  res.json({
    message: ""
  })
})