import React from "react";
import { useState } from "react";
import "./formModule.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
    cname: "",
    pname: "",
    amount: "",
    oname: "",
    stage: "",
    date: "",
    resources: "",
    projname: "",
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

  //Upon Submitting the form 
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/home/create_oppor", data)
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
        <b>CREATE A NEW OPPORTUNITY</b>
      </h1>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>Consultant Name:</label>
          <input
            type="text"
            name="cname"
            value={data.cname}
            onChange={handleInputChange}
          />
        </div>

        <div className="formGroup">
          <label>POC Name:</label>
          <input
            type="text"
            name="pname"
            value={data.pname}
            onChange={handleInputChange}
          />
        </div>

        <div className="formGroup">
          <label>Estimated Amount:</label>
          <input
            type="text"
            name="amount"
            value={data.amount}
            onChange={handleInputChange}
          />
        </div>

        <div className="formGroup">
          <label>Opportunity Name:</label>
          <input
            type="text"
            name="oname"
            value={data.oname}
            onChange={handleInputChange}
          />
        </div>

        <div className="formGroup">
          <label>Stage:</label>
          <input
            type="text"
            name="stage"
            value={data.stage}
            onChange={handleInputChange}
          />
        </div>

        <div className="formGroup">
          <label>Closure Date:</label>
          <input
            type="text"
            name="date"
            value={data.date}
            onChange={handleInputChange}
          />
        </div>

        <div className="formGroup">
          <label>Resource Name:</label>
          <input
            type="text"
            name="resources"
            value={data.resources}
            onChange={handleInputChange}
          />
        </div>

        <div className="formGroup">
          <label>Project Name:</label>
          <input
            type="text"
            name="projname"
            value={data.projname}
            onChange={handleInputChange}
          />
        </div>

        <div className="formGroup">
          <label>Region:</label>
          <input
            type="text"
            name="region"
            value={data.region}
            onChange={handleInputChange}
          />
        </div>

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
