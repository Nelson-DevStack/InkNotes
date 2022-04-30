const mongoose = require('mongoose');
const noteModel = new mongoose.Schema({
  title: String,
  description: String,
  text: String,
}, { timestamps: true });

module.exports = noteModel;