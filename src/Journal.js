import React, { useState } from "react";
import "./Journal.css";
import { FaArrowLeft } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export default function Journal() {
  const [entry, setEntry] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const db = getFirestore();

  // Save journal entry
  const handleSave = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("⚠️ You must be logged in to save a journal entry.");
      return;
    }

    if (!entry.trim()) {
      alert("⚠️ Please write something before saving.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "users", user.uid, "journals"), {
        text: entry,
        createdAt: new Date(),
      });
      alert("✅ Journal entry saved!");
      setEntry(""); // clear after saving
    } catch (error) {
      console.error("Error saving journal:", error);
      alert("❌ Failed to save entry.");
    }

    setLoading(false);
  };

  return (
    <div className="journal-container">
      {/* Header */}
      <header className="journal-header">
        <button className="back-btn">
          <FaArrowLeft />
        </button>
        <h1>Journal</h1>
        <span className="date">{new Date().toDateString()}</span>
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
      <button className="ai-btn" onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save Entry"}
      </button>

      {/* Plus Button */}
      <button className="plus-btn">+</button>
    </div>
  );
}
