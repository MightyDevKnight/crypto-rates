// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"; // Import the CSS file here
import CryptoList from "./components/CryptoList";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CryptoList />} />
      </Routes>
    </Router>
  );
};

export default App;
