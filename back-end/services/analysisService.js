const Analysis = require("../models/Analysis");

exports.getUserAnalysisHistory = async (userId) => {
  try {
    return await Analysis.find({ userId }).sort({ date: -1 });
  } catch (error) {
    console.error("Error fetching user analysis history:", error.message);
    throw new Error("Failed to fetch user analysis history.");
  }
};

exports.saveUserAnalysis = async (userId, analysis) => {
  try {
    const newAnalysis = new Analysis({
      userId,
      analysis,
      date: new Date(), 
    });
    const savedAnalysis= await newAnalysis.save();
    return savedAnalysis;
  } catch (error) {
    console.error("Error saving user analysis:", error.message);
    throw new Error("Failed to save user analysis.");
  }
};
