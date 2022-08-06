const express = require("express");
const app = express();

const {
  artical,
  getartical,
  deletartical,
  editartical,
  getarticalbytopic,
  recentaritical,
  folluser,
  comment,
  followunfollow,
} = require("../conteroller/article");
const { verfiytoken } = require("../middlewere/auth");
//router create artical
app.post("/articalposting/artical", verfiytoken, artical);
//router get all artical...
app.get("/articalposting/getartical", getartical);
//router delete artical...
app.delete("/articalposting/deletartical/:_id", verfiytoken, deletartical);
//router edit artical..
app.put("/articalposting/editartical/:_id", verfiytoken, editartical);
//get artical by topicname
app.get("/articalposting/getarticalbytopic", getarticalbytopic);
// get most recent articles
app.get("/articalposting/recentartical", recentaritical);
// get articles of following users
app.get("/articalposting/follartical", folluser);
//comment on aritical...
app.post("/articalposting/commentartical/:_id", verfiytoken, comment);
//follow and unfollow user
app.post("/articalposting/follow&unfllow/:_id", verfiytoken, followunfollow);

module.exports = app;
