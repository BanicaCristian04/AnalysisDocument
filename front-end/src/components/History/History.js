import React, { useEffect, useState } from "react";
import axios from "axios";
import "./History.css";

const History = ({ user, onSelectAnalysis }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchHistory = async () => {
        try {
          const response = await axios.get("http://localhost:5000/analysis", {
            withCredentials: true,
          });
          setHistory(response.data.history);
        } catch (err) {
          console.error("Error fetching history:", err.response?.data || err.message);
        }
      };
      fetchHistory();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="history-container">
        <h3 className="history-title">Analysis History</h3>
        <p>Please log in to view your history.</p>
      </div>
    );
  }

  const handleSelect = (analysis) => {
    onSelectAnalysis(analysis);
  };

  return (
    <div className="history-container">
      <h3 className="history-title">Analysis History</h3>
      {history.length > 0 ? (
        <ul className="history-list">
          {history.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item.analysis)}
              className="history-item"
            >
              <strong>{item.date && new Date(item.date).toLocaleString()}</strong>
              <br />
              <span>{item.title || "Untitled Document"}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No history available.</p>
      )}
    </div>
  );
};

export default History;
