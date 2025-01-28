const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  analysis: { type: String, required: true }, 
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Analysis", analysisSchema);