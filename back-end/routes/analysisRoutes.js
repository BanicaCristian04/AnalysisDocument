const express = require("express");
const router = express.Router();
const analysisController = require("../controllers/analysisController");

// Route to fetch analysis history
router.get("/", analysisController.getAnalysisHistory);

router.post("/save", analysisController.saveAnalysis);

module.exports = router;
