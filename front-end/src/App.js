import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register/Register";
import DocumentUploader from "./components/DocumentUploader/DocumentUploader";
import History from "./components/History/History";

const App = () => {
  const [user, setUser] = useState(null);
  const [selectedAnalysis, setSelectedAnalysis]=useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get("http://localhost:5000/session/check", {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (err) {
        console.error("No active session:", err.response?.data?.message || err.message);
        setUser(null);
      }
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <Navbar user={user} handleLogout={handleLogout} />
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <div className="main-content">
                <History user={user} onSelectAnalysis={setSelectedAnalysis} />
                <DocumentUploader selectedAnalysis={selectedAnalysis} />
              </div>
            }
          />
          <Route path="/auth/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
