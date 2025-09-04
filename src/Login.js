// src/Login.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import './Login.css'; // Optional: if you prefer separate CSS
import bgImage from './assets/watercolor-blobs-of-light-purple-iphone-59b4ssfs9wbl2yfy 2.png';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Login successful!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="login-container">
      <img
        className="background-image"
        src={bgImage}
        alt="background"
      />
      <div className="blurred-box">
        <h1 className="brand">Reflectere</h1>
        <h2 className="login-title">Login to your account</h2>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">Sign In</button>
        </form>

        <p className="signup-message">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>

        <p className="message">{message}</p>
      </div>
    </div>
  );
}

export default Login;