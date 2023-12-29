import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./formModule.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function NavigationButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/Home")}
      className="border border-1 border-black p-2 hover:bg-gray-500 hover:text-white bg-gray-300"
    >
      Go Back
    </button>
  );
}

function Form() {
  const [Createsnack, setCreatesnack] = React.useState(false);

  const [data, setData] = useState({
    name: "",
    stage: "",
    budget: "",
    sdate: "",
    ddate: "",
    r_id: "",
    rname: "",
    region: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/home/create_proj", data)
      .then((response) => {
        console.log("Data sent successfully:", response.data);
        setCreatesnack(true);
        setTimeout(() => {
          navigate("/Home");
        }, 1500);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <div className="formContainer">
      <h1 className="formTitle">
        <b>CREATE A NEW PROJECT</b>
      </h1>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>Project Name:</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleInputChange}
          />
        </div>
        <br></br>
        <div className="formGroup">
          <label>Project Stage:</label>
          <input
            type="text"
            name="stage"
            value={data.stage}
            onChange={handleInputChange}
          />
        </div>
        <br></br>
        <div className="formGroup">
          <label>Budget:</label>
          <input
            type="text"
            name="budget"
            value={data.budget}
            onChange={handleInputChange}
          />
        </div>
        <br></br>
        <div className="formGroup">
          <label>Start Date:</label>
          <input
            type="text"
            name="sdate"
            value={data.sdate}
            onChange={handleInputChange}
          />
        </div>
        <br></br>
        <div className="formGroup">
          <label>Delivery Date:</label>
          <input
            type="text"
            name="ddate"
            value={data.ddate}
            onChange={handleInputChange}
          />
        </div>
        <br></br>
        <div className="formGroup">
          <label>Resource ID:</label>
          <input
            type="text"
            name="r_id"
            value={data.r_id}
            onChange={handleInputChange}
          />
        </div>
        <br></br>
        <div className="formGroup">
          <label>Resource Name:</label>
          <input
            type="text"
            name="rname"
            value={data.rname}
            onChange={handleInputChange}
          />
        </div>
        <br></br>
        <div className="formGroup">
          <label>Region:</label>
          <input
            type="text"
            name="region"
            value={data.region}
            onChange={handleInputChange}
          />
        </div>
        <br></br>
        <NavigationButton />
        <button
          type="submit"
          className="border border-1 border-black p-2 hover:bg-blue-500 hover:text-white bg-blue-200"
        >
          Create
        </button>
      </form>
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
}

export default Form;
