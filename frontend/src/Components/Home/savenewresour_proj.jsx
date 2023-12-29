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

function SavenewProj() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    p_id,
    projectName,
    resourceName,
    sdate,
    ddate,
    projstage,
    region,
    budget,
    resource_id,
  } = location.state;
  const [Editsnack, setEditsnack] = React.useState(false);

  const [editedData, setEditedData] = useState({
    resource_name: resourceName,
    project_name: projectName,
    start_date: sdate,
    delivery_date: ddate,
    project_stage: projstage,
    region: region,
    budget: budget,
    resource_id: resource_id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      resource_name,
      project_name,
      start_date,
      delivery_date,
      project_stage,
      region,
      budget,
      resource_id
    } = editedData;

    axios
      .put(`http://localhost:3000/home/update_resourProj/${p_id}`, {
        resource_name,
        project_name,
        start_date,
        delivery_date,
        project_stage,
        region,
        budget,
        resource_id
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
        <b>ADD NEW RESOURCE FOR PROJECT</b>
      </h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <div className="formGroup">
            <span className="label">Project Name:</span>
            <input
              type="text"
              name="project_name"
              value={editedData.project_name}
              disabled
            />
          </div>
          <br></br>
          <div className="formGroup">
            <span className="label">Resource ID:</span>
            <input
              type="text"
              name="resource_id"
              placeholder="Enter Resource ID"
              onChange={handleInputChange}
            />
          </div>
          <br></br>
          <div className="formGroup">
            <span className="label">Resource Name:</span>
            <input
              type="text"
              name="resource_name"
              placeholder="Enter Resource Name"
              onChange={handleInputChange}
            />
          </div>
          <br></br>
          <div className="formGroup">
            <span className="label">Project Stage:</span>
            <input
              type="text"
              name="project_stage"
              value={editedData.project_stage}
              disabled
            />
          </div>
          <br></br>
          <div className="formGroup">
            <span className="label">Start Date:</span>
            <input
              type="text"
              name="start_date"
              value={editedData.start_date}
              disabled
            />
          </div>
          <br></br>
          <div className="formGroup">
            <span className="label">Delivery Date:</span>
            <input
              type="text"
              name="delivery_date"
              value={editedData.delivery_date}
              disabled
            />
          </div>
          <br></br>
          <div className="formGroup">
            <span className="label">Region:</span>
            <input
              type="text"
              name="region"
              value={editedData.region}
              disabled
            />
          </div>
          <br/>
          <div className="formGroup">
            <span className="label">Budget:</span>
            <input
              type="text"
              name="budget"
              value={editedData.budget}
              disabled
            />
          </div>
        </div>
        <br></br>
        <NavigationButton />
        <button
          type="submit"
          className="border border-1 border-black p-2 hover:bg-blue-500 hover:text-white bg-blue-200"
        >
          CREATE
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
          Data Added
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SavenewProj;
