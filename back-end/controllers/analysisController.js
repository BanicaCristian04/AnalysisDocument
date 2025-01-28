const analysisService = require("../services/analysisService");

exports.getAnalysisHistory = async (req, res) => {
  try {
    if (!req.session || !req.session.user) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }
    const userId = req.session.user.id;
    const history = await analysisService.getUserAnalysisHistory(userId);

    res.status(200).json({ history });
  } catch (error) {
    console.error("Error fetching analysis history:", error.message);
    res.status(500).json({ error: "Failed to fetch analysis history." });
  }
};

exports.saveAnalysis = async (req, res) => {
  try {

    if (!req.session || !req.session.user) 
      return res.status(401).json({ error: "Unauthorized. Please log in." });

    const { analysis } = req.body;

    if (!analysis) {
      return res.status(400).json({ error: "Analysis data is required." });
    }
    await analysisService.saveUserAnalysis(req.session.user.id, analysis);

    res.status(201).json({ message: "Analysis saved successfully." });
  } catch (error) {
    console.error("Error saving analysis:", error.message);
    res.status(500).json({ error: "Failed to save analysis." });
  }
};
