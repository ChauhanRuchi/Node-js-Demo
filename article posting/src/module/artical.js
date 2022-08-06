const { type } = require("express/lib/response");
const { Mongoose } = require("mongoose");
const { mongoose } = require("../db/mongoos");

const topic = mongoose.Schema({
  user_id: { type: Number, trim: true },
  topicname: { type: String, trim: true },
  authorname: { type: String, trim: true },
  introduction: { type: String, trim: true },
  decription: { type: String, trim: true },
  comment: [{ data: String, user_id: Number }],
  followUnfollow: [{ data: Boolean, user_id: Number }],
  link: { type: String, trim: true },
});

module.exports = mongoose.model("articals", topic);
