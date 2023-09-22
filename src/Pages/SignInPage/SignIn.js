
import "./signin.scss"
import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "../../Firebase";

const auth = getAuth(app);

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
      navigate("/homepage");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error signing in:", error);
      setError("Error signing in, check your email and password.");
    }
  };

  return (
    <div className="signin_cont">
      <div className="signin">
        <form className="signinform" onSubmit={handleSignIn}>
          <label className="signin_text">Email</label>
          <input
            type="email"
            placeholder="myemail@gmail.com"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="signin_text">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="custom-button modi-btn"
          >
            Log In
          </button>
          {error && (
            <p className="error-text">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
