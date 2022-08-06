const express = require("express");
const app = express();

const { craetetopic, gettopic } = require("../conteroller/topic");
const { verfiytoken } = require("../middlewere/auth");

//post api in create topic
app.post("/articalposting/topic", verfiytoken, craetetopic);
//get api in get all topic list
app.get("/articalposting/gettopic", gettopic);

module.exports = app;
