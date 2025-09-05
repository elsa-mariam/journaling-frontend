import React, { useState } from "react";
import "./Journal.css";
import { FaArrowLeft } from "react-icons/fa";

export default function Journal() {
  const [entry, setEntry] = useState("");

  return (
    <div className="journal-container">
      {/* Header */}
      <header className="journal-header">
        <button className="back-btn">
          <FaArrowLeft />
        </button>
        <h1>Journal</h1>
        <span className="date">Monday 1 Sep</span>
      </header>

      {/* Subtext */}
      <p className="subtext">Share your thoughts</p>

      {/* Textarea */}
      <textarea
        className="journal-textarea"
        placeholder="Write here..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />

      {/* AI Response Button */}
      <button className="ai-btn">AI Response</button>

      {/* Plus Button */}
      <button className="plus-btn">+</button>
    </div>
  );
}
