const diffService = require("../services/diffServices");
const analysisService = require("../services/analysisService");

exports.analyzeDiff = async (req, res) => {
  try {

    const doc1Buffer = req.files.doc1[0].buffer;
    const doc2Buffer = req.files.doc2[0].buffer;

    const result = await diffService.analyzeDiff(doc1Buffer, doc2Buffer);

    const userId = req.session.user.id; 
    await analysisService.saveUserAnalysis(userId, result);
   
    res.status(200).json({ html: result });
  } catch (error) {
    console.error("Error analyzing documents:", error.message);
    res.status(500).json({ error: "Failed to analyze documents" });
  }
};
