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
    uti_id: '',
    rname: '',
    pname: '',
    bill: '',
  });

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
      .post('http://localhost:3000/home/create_Uti', data)
      .then((response) => {
        console.log('Data sent successfully:', response.data);
        setCreatesnack(true);
        setTimeout(() => {
          navigate('/Home');
        }, 1500);
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
  };

  return (
    <div className="formContainer">
      <h1 className="formTitle">
        <b>CREATE A NEW UTILIZATION</b>
      </h1>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>UTILIZATION ID:</label>
          <input
            type="integer"
            name="uti_id"
            value={data.uti_id}
            onChange={handleInputChange}
          />
        </div>
        <br></br>
        <div className="formGroup">
          <label>RESOURCE NAME:</label>
          <input
            type="text"
            name="rname"
            value={data.rname}
            onChange={handleInputChange}
          />
        </div>
        <br></br>
        <div className="formGroup">
          <label>PROJECT NAME:</label>
          <input
            type="text"
            name="pname"
            value={data.pname}
            onChange={handleInputChange}
          />
        </div>
        <br></br>
        <div className="formGroup">
          <label>UTILIZATION (in %):</label>
          <input
            type="integer"
            name="bill"
            value={data.bill}
            onChange={handleInputChange}
          />
        </div>
        <br></br>
        <NavigationButton />
        <button
          type="submit"
          className="border border-1 border-black p-2 hover-bg-blue-500 hover-text-white bg-blue-200"
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