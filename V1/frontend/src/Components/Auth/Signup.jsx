import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./Signup.css";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import google_icon from "../Assets/google.svg";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Signup = () => {
  const navigate = useNavigate();
  const [Createsnack, setCreatesnack] = React.useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!formData.username.trim()) {
      validationErrors.username = "Username is required";
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(formData.email)) {
      validationErrors.email = "Invalid email format";
    }

    if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long";
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post("http://localhost:3000/Signup", formData);
        if (response.status === 200) {
          console.log("Data Added Succesfully");
          setCreatesnack(true);
          setTimeout(() => {
            navigate('/login');
          }, 1500);

        } else {
          console.error("Error adding data to the database");
        }
      } catch (error) {
        console.error("Axios request error", error);
      }
    } else {
      setErrors(validationErrors);
    }
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

  return (
    <div className="container">
      <div className="box">
        <div className="header">
          <div className="text">Sign Up</div>
          <div className="underline"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="input">
              <img src={user_icon} alt="User Icon" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <div className="error">{errors.username}</div>
              )}
            </div>
            <div className="input">
              <img src={email_icon} alt="Email Icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div className="input">
              <img src={password_icon} alt="Password Icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>
          </div>
          <button className="signup-button content-normal" type="submit">
            Sign Up
          </button>
        </form>
        <div className="or">OR</div>
        <button className="google-button" onClick={handleGoogleSignIn}>
          <img src={google_icon} alt="Google Icon" />
          Sign Up with Google
        </button>
        <div className="footer">
          <span>Already have an account?</span> <Link to="/login">Log In</Link>
        </div>
      </div>
      <Snackbar
        open={Createsnack}
        autoHideDuration={3000}
        onClose={() => setCreatesnack(false)}
      >
        <Alert
          onClose={() => setCreatesnack(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Data Created, Please Wait...
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Signup;
