const { mongoose } = require("../db/mongoos");

const article = mongoose.Schema({
  email: { type: String, trim: true, unique: true },
  password: { type: String, trim: true },
});

module.exports = mongoose.model("Signup", article);
