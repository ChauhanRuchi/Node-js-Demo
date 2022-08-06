const express = require("express");
const user = require("./router/user");
const topic = require("./router/topic");
const artical = require("./router/article");

const app = express();

app.use(express.json());
app.use(user);
app.use(topic);
app.use(artical);

//post api in signup
app.listen(2003);
