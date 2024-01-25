import React, { useState } from "react";
import './formModule.css';
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
    <button onClick={() => navigate("/Home")} className='border border-1 border-black p-2 hover:bg-gray-500 hover:text-white bg-gray-300'>Go Back</button>
  );
}

function Form() {
  const navigate = useNavigate();

  const [Createsnack, setCreatesnack] = useState(false);

  const [data, setData] = useState({
    rname: '',
    currproject: '',
    timeon: '',
    timeoff: '',
    skill: '',
    r_id: ''
  });

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
      .post('http://localhost:3000/home/create_resour', data)
      .then((response) => {
        console.log('Data sent successfully:', response.data);
        setCreatesnack(true);
        setTimeout(() => {
          navigate("/Home");
        }, 1500);
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
  };

  return (
    <div className="formContainer">
      <h1 className="formTitle">
        <b>CREATE A NEW RESOURCE</b>
      </h1>
      <br></br>
      <form onSubmit={handleSubmit}>
      <div className="formGroup">
          <label>Employee ID:</label>
          <input
            type="text"
            name="r_id"
            value={data.r_id}
            onChange={handleInputChange}
          />
        </div>
        <br/>
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
          <label>Project Assigned:</label>
          <input
            type="text"
            name="currproject"
            value={data.currproject}
            onChange={handleInputChange}
          />
        </div>
        <br></br>
        <div className="formGroup">
          <label>Time ON project:</label>
          <input
            type="text"
            name="timeon"
            value={data.timeon}
            onChange={handleInputChange}
          />
        </div>
        <br></br>
        <div className="formGroup">
          <label>Time OFF project:</label>
          <input
            type="text"
            name="timeoff"
            value={data.timeoff}
            onChange={handleInputChange}
          />
        </div>
        <br></br>
        <div className="formGroup">
          <label>Skill Learned/ Learning:</label>
          <input
            type="text"
            name="skill"
            value={data.skill}
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