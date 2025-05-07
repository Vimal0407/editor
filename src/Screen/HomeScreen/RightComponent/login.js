// src/Screen/HomeScreen/RightComponent/login.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import ForgotPassword from "./ForgotPassword";
import "./login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/home" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // Navigate to protected route
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {loginError && <p className="error">{loginError}</p>}
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
        <p>
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="link-button"
          >
            Forgot Password?
          </button>
        </p>
      </div>

      {showForgotPassword && (
        <ForgotPassword onClose={() => setShowForgotPassword(false)} />
      )}
    </div>
  );
};

export default Login;
