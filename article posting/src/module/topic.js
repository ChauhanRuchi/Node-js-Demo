const { mongoose } = require("../db/mongoos");

const topic = mongoose.Schema({
  topic: { type: String, trim: true, unique: true },
});

module.exports = mongoose.model("Topic", topic);
