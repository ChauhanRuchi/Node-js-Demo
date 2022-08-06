const { type } = require("express/lib/response");
const { Mongoose } = require("mongoose");
const { mongoose } = require("../db/mongoos");

const comment = mongoose.Schema({
  comment: [{ data: { type: String }, user_id: { type: Number } }],
});

module.exports = mongoose.model("comment", comment);
