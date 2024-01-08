import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
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

function EditResour() {
  const navigate = useNavigate();
  const location = useLocation();
  const { r_id, projectName, resourceName, projontime, projofftime, skill } =
    location.state; //Fetch the existing data

  const [Editsnack, setEditsnack] = React.useState(false);

  const [editedData, setEditedData] = useState({
    resourlabel: resourceName,
    projlabel: projectName,
    ontime: projontime,
    offtime: projofftime,
    skill: skill,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { resourlabel, projlabel, ontime, offtime, skill } = editedData;

    axios
      .put(`http://localhost:3000/home/update_resour/${r_id}`, {
        resourlabel,
        projlabel,
        ontime,
        offtime,
        skill,
      })
      .then((response) => {
        console.log(response.data);
        setEditsnack(true);
        setTimeout(() => {
          navigate("/Home");
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="formContainer">
      <h1 className="formTitle">
        <b>EDIT RESOURCE</b>
      </h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <span className="label">Resource Name:</span>
          <input
            type="text"
            name="resourlabel"
            value={editedData.resourlabel}
            disabled
          />
        </div>
        <br />
        <div className="formGroup">
          <span className="label">Project Name:</span>
          <input
            type="text"
            name="projlabel"
            value={
              editedData.projlabel === projectName
                ? projectName
                : editedData.projlabel
            }
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div className="formGroup">
          <span className="label">Time On Project:</span>
          <input
            type="text"
            name="ontime"
            value={
              editedData.ontime === projontime ? projontime : editedData.ontime
            }
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div className="formGroup">
          <span className="label">Time Off Project:</span>
          <input
            type="text"
            name="offtime"
            value={
              editedData.offtime === projofftime
                ? projofftime
                : editedData.offtime
            }
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div className="formGroup">
          <span className="label">Skill Learned/ Learning:</span>
          <input
            type="text"
            name="skill"
            value={editedData.skill === skill ? skill : editedData.skill}
            onChange={handleInputChange}
          />
        </div>
        <br></br>
        <NavigationButton />
        <button
          type="submit"
          className="border border-1 border-black p-2 hover:bg-blue-500 hover:text-white bg-blue-200"
        >
          EDIT
        </button>
      </form>
      <Snackbar
        open={Editsnack}
        autoHideDuration={3000}
        onClose={() => setEditsnack(false)}
      >
        <Alert
          onClose={() => setEditsnack(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          Data Edited
        </Alert>
      </Snackbar>
    </div>
  );
}

export default EditResour;
