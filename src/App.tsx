// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CryptoList from "./components/CryptoList";
import CryptoDetail from "./components/CryptoDetail";
import "./App.css"; // Import the CSS file here

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CryptoList />} />
        <Route
          path="/:baseCurrency/:quoteCurrency"
          element={<CryptoDetail />}
        />
      </Routes>
    </Router>
  );
};

export default App;
