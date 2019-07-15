const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Data = new Schema({
  id: { type: String, required: true },
  username: { type: String, required: true },
  description: { type: String, required: true },
  durations: { type: Number, required: true },
  date: { type: Date, required: true }
});

module.exports = mongoose.model("Data", Data);
