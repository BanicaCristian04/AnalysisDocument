import React from "react";
import "./AnalysisResult.css";

const AnalysisResult = ({ analysis }) => {
  if (!analysis) {
    return <p>No analysis data available.</p>;
  }

  const renderSubstantiveChanges = () => {
    return analysis["1. Substantive Changes"].map((change, index) => (
      <div key={index} className="change-section">
        <h4>{change["article"]} - {change["title"] || "Untitled"}</h4>
        {change["PREVIOUS:"] && (
          <p>
            <strong>PREVIOUS:</strong> {change["PREVIOUS:"]}
          </p>
        )}
        {change["NEW:"] && (
          <p>
            <strong>NEW:</strong> {change["NEW:"]}
          </p>
        )}
        <p>
          <strong>Legal Impact Analysis:</strong> {change["Legal Impact Analysis"]}
        </p>
      </div>
    ));
  };

  const renderExpressionChanges = () => {
    return analysis["2. Expression Changes"].map((change, index) => (
      <div key={index} className="change-section">
        <h4>{change["article"]} - {change["title"] || "Untitled"}</h4>
        <p>
          <strong>Change Summary:</strong> {change["Change Summary"]}
        </p>
      </div>
    ));
  };

  return (
    <div className="analysis-container">
      <h3>Analysis Result</h3>
      <div className="section">
        <h4>1. Substantive Changes:</h4>
        {renderSubstantiveChanges()}
      </div>
      <div className="section">
        <h4>2. Expression Changes:</h4>
        {renderExpressionChanges()}
      </div>
    </div>
  );
};

export default AnalysisResult;
