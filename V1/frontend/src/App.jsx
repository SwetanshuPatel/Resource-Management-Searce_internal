import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Auth/Signup.jsx";
import Login from "./Components/Auth/Login.jsx";
import Home from "./Components/Home/home.jsx";
import CreateOppor from "./Components/Home/createoppor.jsx"
import CreateProj from "./Components/Home/createproj.jsx";
import CreateInter from "./Components/Home/createinter.jsx";
import CreateResour from "./Components/Home/createresour.jsx";
import CreateAcI from "./Components/Home/createaci.jsx";
import CreateUti from "./Components/Home/createuti.jsx";
import EditUti from "./Components/Home/edituti";
import EditResour from "./Components/Home/editresour";
import EditProj from "./Components/Home/editproj";
import NewResourProj from "./Components/Home/savenewresour_proj.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Home/CreateOppor" element={<CreateOppor />} />
        <Route path="/Home/CreateProj" element={<CreateProj />} />
        <Route path="/Home/CreateInter" element={<CreateInter />} />
        <Route path="/Home/CreateResour" element={<CreateResour />} />
        <Route path="/Home/CreateAcI" element={<CreateAcI />} />
        <Route path="/Home/CreateUti" element={<CreateUti />} />
        <Route path="/Home/EditUti/:id" element={<EditUti />} />
        <Route path="/Home/EditResour/:id" element={<EditResour />} />
        <Route path="/Home/EditProj/:id" element={<EditProj />} />
        <Route path="/Home/NewresourceProj/:id" element={<NewResourProj />} />
      </Routes>
    </Router>
  );
}

export default App;
