import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import google_icon from "../Assets/google.svg";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authStatus, setStatus] = useState(false);
  const [loginAttempt, setAttempt] = useState(false);
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Google Sign-In Successful", user);
      navigate("/home");
    } catch (error) {
      console.error("Google Sign-In Error", error);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    setAttempt(true);
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        console.log(await response.json());
        setStatus(true);
        navigate("/Home");
      } else {
        console.error("Authentication failed");
        setStatus(false);
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <div className="container">
      <div className="box">
        <div className="header">
          <div className="text">Log In</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="Email Icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="Password Icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
        {loginAttempt && !authStatus && (
          <div className="failMessage">Login again!!</div>
        )}
        <button className="login-button" onClick={handleLogin}>
          Log In
        </button>
        <div className="or">OR</div>
        <button className="google-button" onClick={handleGoogleSignIn}>
          <img src={google_icon} alt="Google Icon" />
          Log In with Google
        </button>
        <div className="footer">
          <span>Don't have an account?</span> <Link to="/">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
