import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { Link } from "react-router-dom"; // ✅ Use Link for internal routing
import "./forgotPassword.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ Password reset link sent to your email.");
    } catch (error) {
      setMessage("❌ Error: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Reset Password</h2>
        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Send Reset Link</button>
        </form>
        {message && <p>{message}</p>}
        <p>
          Back to <Link to="/login">Login</Link> {/* ✅ Internal routing */}
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
