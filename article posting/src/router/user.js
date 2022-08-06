const express = require("express");
const app = express();

const { register, login } = require("../conteroller/user");
//post api in sign up
app.post("/articalposting/signup", register);
//post api in signin
app.post("/articalposting/signin", login);
module.exports = app;
