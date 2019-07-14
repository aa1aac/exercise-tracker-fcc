const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  username: { required: true, type: String },
  id: { require: true, type: String }
});

module.exports = mongoose.model("User", User);
