import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    signup({name, email, password });   // ✅ save account
    alert("Account created successfully!");
    navigate("/login");            // redirect to login
  };

  return (
    <div className="signup-page">
    <div className="signup-box">
    <h2>Create Account</h2>
         <form onSubmit={handleSubmit}>
        <input
    type="text"
    placeholder="Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
  />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
        <button type="submit">Sign Up</button>
      </form>
       <p>Already have an account? <a href="/login">Login</a></p>
  </div>
   </div>
    
  );
};

export default Signup;