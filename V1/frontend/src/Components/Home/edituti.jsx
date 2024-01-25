import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

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

function EditUti() {
  const navigate = useNavigate();
  const location = useLocation();
  const { u_id, projectName, resourceName } = location.state; //Fetch the existing data
  const [Editsnack, setEditsnack] = React.useState(false);

  const [editedData, setEditedData] = useState({
    resourlabel: resourceName,
    projlabel: projectName,
    bill: "",
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
    const { resourlabel, projlabel, bill } = editedData;

    axios
      .put(`http://localhost:3000/home/edit_Uti/${u_id}`, {
        resourlabel,
        projlabel,
        bill,
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
        <b>EDIT UTILIZATION</b>
      </h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <div className="formGroup">
            <span className="label">Resource Name:</span>
            <input name="resourcelabel" value={resourceName} disabled />
          </div>
          <br></br>
          <div className="formGroup">
            <span className="label">Project Name:</span>
            <input name="projlabel" value={projectName} disabled />
          </div>
          <br></br>
          <div className="formGroup flex">
            <span className="label">Billable:</span>
            <div className="flex-grow">
              <Box sx={{ width: 275, marginLeft: '225px' }}>
                <Slider
                  name="bill"
                  onChange={handleInputChange}
                  defaultValue={30}
                  step={5}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                />
              </Box>
            </div>
          </div>
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

export default EditUti;
