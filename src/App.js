// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Journal from "./Journal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Journal />} />
      </Routes>
    </Router>
  );
}

export default App;