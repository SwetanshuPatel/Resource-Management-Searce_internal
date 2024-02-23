import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./Pages/login";
import Home from "./Pages/home";
import Projects from "./Pages/project";

export default function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          user ? <Home user={user} /> : <Navigate to="Login" />
        }
      />
      <Route
        exact
        path="/home"
        element={user ? <Home user={user} /> : <Login />}
      />
      <Route
        exact
        path="/login"
        element={user ? <Home user={user} /> : <Login />}
      />
      <Route
        exact
        path="/projects"
        element={user ? <Projects user={user} /> : <Login />}
      />
    </Routes>
  );
}
