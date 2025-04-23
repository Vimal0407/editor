import React from "react";
import "./sign.scss"

export const SignUp = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign up</h2>
        <form>
          <input type="text" placeholder="Username" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Create Account</button>
        </form>
        <p>Already have an account? <a href="/login">Log In</a></p>
      </div>
    </div>
  );
};
