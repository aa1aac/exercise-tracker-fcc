const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  userId: { required: true, type: String }
});

mongoose.model("User", User);

exports.User = User;
