// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"; // Import the CSS file here

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={""} />
      </Routes>
    </Router>
  );
};

export default App;
