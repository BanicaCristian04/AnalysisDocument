import React, { useState,useEffect } from "react";
import axios from "axios";
import "./DocumentUploader.css";

const DocumentUploader = ({selectedAnalysis}) => {
  const [doc1, setDoc1] = useState(null);
  const [doc2, setDoc2] = useState(null);
  const [analysis, setAnalysis] = useState(selectedAnalysis || null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedAnalysis) {
      setAnalysis(selectedAnalysis); 
    }
  }, [selectedAnalysis]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (e.target.name === "doc1") {
      setDoc1(file);
    } else if (e.target.name === "doc2") {
      setDoc2(file);
    }
  };
  const formatAnalysis = (analysisData) => {
    const formatText = (text) =>
      text.replace(/\n/g, "<br>").replace(/\\/g, "").trim();

    let html = "";
    for (const [section, changes] of Object.entries(analysisData)) {
      html += `<h2>${section}</h2>`;
      changes.forEach((change) => {
        for (const [article, details] of Object.entries(change)) {
          html += `<h3>${article}</h3>`;
          for (const [key, value] of Object.entries(details)) {
            html += `<p><strong>${key}</strong>: ${formatText(value)}</p>`;
          }
        }
      });
    }
    return html;
  };
  const handleAnalyze = async () => {
    if (!doc1 || !doc2) {
      setError("Please upload both documents.");
      return;
    }

    const formData = new FormData();
    formData.append("doc1", doc1);
    formData.append("doc2", doc2);

    try {
      setError("");
      const response = await axios.post("http://localhost:5000/diff", formData,{
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials:true,
      });

      setAnalysis(response.data.html);
    } catch (err) {
      setError("Error analyzing documents.");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="uploader-container">
      <h2>Upload Documents</h2>
      <div className="file-input">
        <label>Document 1:</label>
        <input type="file" name="doc1" accept=".pdf" onChange={handleFileChange} />
      </div>
      <div className="file-input">
        <label>Document 2:</label>
        <input type="file" name="doc2" accept=".pdf" onChange={handleFileChange} />
      </div>
      <button onClick={handleAnalyze}>Analyze</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {analysis && (
        <div className="analysis-result">
          <h3>Analysis Result</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(analysis, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default DocumentUploader;
