// src/Signup.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase"; // ✅ import db
import './Signup.css';
import bgImage from './assets/watercolor-blobs-of-light-purple-iphone-59b4ssfs9wbl2yfy 2.png';

function Signup() {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        createdAt: serverTimestamp()
      });

      setMessage("Signup successful! User data saved to Firestore 🎉");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="signup-container">
      <img src={bgImage} alt="background" className="signup-bg" />
      <div className="signup-content">
        <h1 className="brand">Reflectere</h1>

        <div className="profile-upload">
          <label htmlFor="profile-input">
            <div className="profile-circle">
              {profileImage ? (
                <img src={profileImage} alt="profile" className="profile-preview" />
              ) : (
                <span className="profile-icon">👤</span>
              )}
              <div className="plus-icon">＋</div>
            </div>
          </label>
          <input
            id="profile-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>

        <form className="signup-form" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>

        <p className="bottom-text">
          Already have an account? <a href="/">Sign In</a>
        </p>

        {message && <p className="signup-message">{message}</p>}
      </div>
    </div>
  );
}

export default Signup;