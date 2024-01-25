import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./opporeffect.css";
import "./listitembutton.css";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "./deleteconfirm.jsx";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function ViewOppor() {
  const navigate = useNavigate();
  const [response, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editableField, setEditableField] = useState(null);
  const [editableValue, setEditableValue] = useState({});
  const [Editsnack, setEditsnack] = React.useState(false);
  const [Deletesnack, setDeletesnack] = React.useState(false);
  const [Createsnack, setCreatesnack] = React.useState(false);
  const [Movesnack, setMovesnack] = React.useState(false);
  const [consultNames, setconsultNames] = useState([]);
  const [pocNames, setpocNames] = useState([]);
  // const [stages, setstage] = useState([]);
  const [resourceNames, setresource] = useState([]);
  const [projectNames, setproject] = useState([]);
  const [regions, setregion] = useState([]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    getData();

    //GET DISTINCT CONSULTANT NAMES
    axios
      .get("http://localhost:3000/home/getconsult")
      .then((response) => {
        setconsultNames(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resources", error);
      });

    //GET DISTINCT POC NAMES
    axios
      .get("http://localhost:3000/home/getpoc")
      .then((response) => {
        setpocNames(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resources", error);
      });

    //GET DISTINCT STAGE
    // axios
    //   .get("http://localhost:3000/home/getstage")
    //   .then((response) => {
    //     setstage(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching resources", error);
    //   });

    //GET DISTINCT RESOURCES
    axios
      .get("http://localhost:3000/home/getresource")
      .then((response) => {
        setresource(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resources", error);
      });

    //GET DISTINCT PROJECT NAMES
    axios
      .get("http://localhost:3000/home/getproject")
      .then((response) => {
        setproject(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resources", error);
      });

    //GET DISTINCT REGION
    axios
      .get("http://localhost:3000/home/getregion")
      .then((response) => {
        setregion(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resources", error);
      });
  }, []);

  //Fetch the data from the database
  const getData = async () => {
    try {
      const { data, status } = await axios.get(
        "http://localhost:3000/home/view_oppor"
      );

      if (status === 200) {
        setLoading(false);
        setData(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/delete_oppor/${id}`)
      .then((response) => {
        console.log(response.data);
        getData();
        setDeletesnack(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [deleteItemId, setDeleteItemId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = (itemId) => {
    setDeleteItemId(itemId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteItemId(null);
    setIsDeleteModalOpen(false);
  };

  const handleEdit = (item) => {
    setEditableField(item.opportunity_id);
    setEditableValue({
      opportunity_name: item.opportunity_name,
      consultant_name: item.consultant_name,
      poc_name: item.poc_name,
      estimated_amount: item.estimated_amount,
      stage: item.stage,
      closure_date: item.closure_date,
      resource_id: item.resource_id,
      resource_name: item.resource_name,
      project_name: item.project_name,
      region: item.region,
    });
  };

  const handleSave = (item) => {
    item.opportunity_name = editableValue.opportunity_name;
    item.consultant_name = editableValue.consultant_name;
    item.poc_name = editableValue.poc_name;
    item.estimated_amount = editableValue.estimated_amount;
    item.stage = editableValue.stage;
    item.closure_date = editableValue.closure_date;
    item.resource_id = editableValue.resource_id;
    item.resource_name = editableValue.resource_name;
    item.project_name = editableValue.project_name;
    item.region = editableValue.region;

    axios
      .put(`http://localhost:3000/home/update_oppor/${item.opportunity_id}`, {
        opportunity_name: item.opportunity_name,
        consultant_name: item.consultant_name,
        poc_name: item.poc_name,
        estimated_amount: item.estimated_amount,
        stage: item.stage,
        closure_date: item.closure_date,
        resource_id: item.resource_id,
        resource_name: item.resource_name,
        project_name: item.project_name,
        region: item.region,
      })
      .then((response) => {
        console.log(response.data);
        if(item.stage === "Opportunity Closed"){
          handleMove(item);
        }
        setEditsnack(true);
      })
      .catch((error) => {
        console.error(error);
      });

    setExpandedCardId(null);
    setEditableField(null);
  };

  const handleMove = (item) => {
    console.log("hanldeMove called for item : ",item);
    item.estimated_amount = editableValue.estimated_amount;
    item.stage = editableValue.stage;
    item.closure_date = editableValue.closure_date;
    item.resource_id = editableValue.resource_id;
    item.resource_name = editableValue.resource_name;
    item.project_name = editableValue.project_name;
    item.region = editableValue.region;

    axios
      .post(`http://localhost:3000/home/move_oppor/${item.opportunity_id}`, {
        estimated_amount: item.estimated_amount,
        stage: "Stage 0",
        start_date: "New Date Expected",
        closure_date: "New Date Expected",
        resource_id: item.resource_id,
        resource_name: item.resource_name,
        project_name: item.project_name,
        region: item.region,
      })
      .then((response) => {
        console.log(response.data);
        setMovesnack(true);
        axios
          .delete(`http://localhost:3000/delete_oppor/${item.opportunity_id}`)
          .then((response) => {
            console.log(response.data);
            setTimeout(() => {
              getData();
            }, 1000);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [expandedCardId, setExpandedCardId] = useState(null);

  const handleCardClick = useCallback((e, itemId) => {
    const isCardClick =
      e.target.classList.contains("card") &&
      !e.target.classList.contains("edit-button") &&
      !e.target.classList.contains("delete-button");

    if (isCardClick) {
      setExpandedCardId((prevId) => (prevId === itemId ? null : itemId));
    }
  }, []);

  return (
    <div>
      {loading ? (
        <p>Please Wait...</p>
      ) : (
        <div>
          <button
            onClick={() => {
              navigate("/Home/CreateOppor");
            }}
            className="border border-1 border-white p-2 hover:bg-blue-500 hover:text-white"
          >
            <AddIcon /> Add Opportunity
          </button>
          <br></br>
          <br></br>
          <ul className="card-container">
            {response.map((item) => (
              <div
                className={`list-item card ${
                  expandedCardId === item.opportunity_id ? "active" : ""
                }`}
                key={item.opportunity_id}
                onClick={(e) => handleCardClick(e, item.opportunity_id)}
              >
                <div
                  className="card-front"
                  onClick={() => setExpandedCardId(item.opportunity_id)}
                >
                  <strong>Opportunity Name:</strong> {item.opportunity_name}
                </div>
                <div className="card-back">
                  <strong>Opportunity Name:</strong>{" "}
                  {editableField === item.opportunity_id ? (
                    <span>
                      <Autocomplete
                        value={editableValue.opportunity_name}
                        onChange={(e, newValue) =>
                          setEditableValue({
                            ...editableValue,
                            opportunity_name: newValue,
                          })
                        }
                        options={[]}
                        freeSolo
                        onInputChange={(e, newInputValue) => {
                          return newInputValue;
                        }}
                        getOptionSelected={(option, value) => option === value}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </span>
                  ) : (
                    <span>{item.opportunity_name}</span>
                  )}
                  <hr width="90%" color="black"></hr>
                  <br></br>
                  <strong>Consultant Name:</strong>{" "}
                  {editableField === item.opportunity_id ? (
                    <span>
                      <Autocomplete
                        value={editableValue.consultant_name}
                        onChange={(e, newValue) =>
                          setEditableValue({
                            ...editableValue,
                            consultant_name: newValue,
                          })
                        }
                        options={consultNames}
                        freeSolo
                        onInputChange={(e, newInputValue) => {
                          return newInputValue;
                        }}
                        getOptionSelected={(option, value) => option === value}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </span>
                  ) : (
                    <span>{item.consultant_name}</span>
                  )}
                  <br></br>
                  <strong>POC Name:</strong>{" "}
                  {editableField === item.opportunity_id ? (
                    <span>
                      <Autocomplete
                        value={editableValue.poc_name}
                        onChange={(e, newValue) =>
                          setEditableValue({
                            ...editableValue,
                            poc_name: newValue,
                          })
                        }
                        options={pocNames}
                        freeSolo
                        onInputChange={(e, newInputValue) => {
                          return newInputValue;
                        }}
                        getOptionSelected={(option, value) => option === value}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </span>
                  ) : (
                    <span>{item.poc_name}</span>
                  )}
                  <br></br>
                  <strong>Estimated Amount: $</strong>
                  {""}
                  {editableField === item.opportunity_id ? (
                    <span>
                      <Autocomplete
                        value={editableValue.estimated_amount}
                        onChange={(e, newValue) =>
                          setEditableValue({
                            ...editableValue,
                            estimated_amount: newValue,
                          })
                        }
                        options={[]}
                        freeSolo
                        onInputChange={(e, newInputValue) => {
                          return newInputValue;
                        }}
                        getOptionSelected={(option, value) => option === value}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </span>
                  ) : (
                    <span>{item.estimated_amount}</span>
                  )}
                  <br></br>
                  <strong>Stage:</strong>{" "}
                  {editableField === item.opportunity_id ? (
                    <span>
                      <Autocomplete
                        value={editableValue.stage}
                        onChange={(e, newValue) =>
                          setEditableValue({
                            ...editableValue,
                            stage: newValue,
                          })
                        }
                        options={['Opportunity Open','Opportunity Closed']}
                        freeSolo
                        onInputChange={(e, newInputValue) => {
                          return newInputValue;
                        }}
                        getOptionSelected={(option, value) => option === value}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </span>
                  ) : (
                        <span>{item.stage}</span>
                  )}
                  <br></br>
                  <strong>Closure Date:</strong>{" "}
                  {editableField === item.opportunity_id ? (
                    <span>
                      <Autocomplete
                        value={editableValue.closure_date}
                        onChange={(e, newValue) =>
                          setEditableValue({
                            ...editableValue,
                            closure_date: newValue,
                          })
                        }
                        options={[]}
                        freeSolo
                        onInputChange={(e, newInputValue) => {
                          return newInputValue;
                        }}
                        getOptionSelected={(option, value) => option === value}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </span>
                  ) : (
                    <span>{item.closure_date}</span>
                  )}
                  <br></br>
                  <strong>Resource ID:</strong>{" "}
                  {editableField === item.opportunity_id ? (
                    <span>
                      <Autocomplete
                        value={editableValue.resource_id}
                        onChange={(e, newValue) =>
                          setEditableValue({
                            ...editableValue,
                            resource_id: newValue,
                          })
                        }
                        options={[]}
                        freeSolo
                        onInputChange={(e, newInputValue) => {
                          return newInputValue;
                        }}
                        getOptionSelected={(option, value) => option === value}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </span>
                  ) : (
                    <span>{item.resource_id}</span>
                  )}
                  <br></br>
                  <strong>Resource Name:</strong>{" "}
                  {editableField === item.opportunity_id ? (
                    <span>
                      <Autocomplete
                        value={editableValue.resource_name}
                        onChange={(e, newValue) =>
                          setEditableValue({
                            ...editableValue,
                            resource_name: newValue,
                          })
                        }
                        options={resourceNames}
                        freeSolo
                        onInputChange={(e, newInputValue) => {
                          return newInputValue;
                        }}
                        getOptionSelected={(option, value) => option === value}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </span>
                  ) : (
                    <span>{item.resource_name}</span>
                  )}
                  <br></br>
                  <strong>Project Name:</strong>{" "}
                  {editableField === item.opportunity_id ? (
                    <span>
                      <Autocomplete
                        value={editableValue.project_name}
                        onChange={(e, newValue) =>
                          setEditableValue({
                            ...editableValue,
                            project_name: newValue,
                          })
                        }
                        options={projectNames}
                        freeSolo
                        onInputChange={(e, newInputValue) => {
                          return newInputValue;
                        }}
                        getOptionSelected={(option, value) => option === value}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </span>
                  ) : (
                    <span>{item.project_name}</span>
                  )}
                  <br></br>
                  <strong>Region:</strong>{" "}
                  {editableField === item.opportunity_id ? (
                    <span>
                      <Autocomplete
                        value={editableValue.region}
                        onChange={(e, newValue) =>
                          setEditableValue({
                            ...editableValue,
                            region: newValue,
                          })
                        }
                        options={regions}
                        freeSolo
                        onInputChange={(e, newInputValue) => {
                          return newInputValue;
                        }}
                        getOptionSelected={(option, value) => option === value}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </span>
                  ) : (
                    <span>{item.region}</span>
                  )}
                </div>
                <div className="button-container">
                  <div className="button-wrapper">
                    {editableField === item.opportunity_id ? (
                      <button onClick={() => handleSave(item)}>
                        <SaveIcon />
                      </button>
                    ) : (
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(item)}
                      >
                        <CreateIcon />
                      </button>
                    )}
                  </div>
                  <div className="button-wrapper">
                    <button
                      className="delete-button"
                      onClick={() => openDeleteModal(item.opportunity_id)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <DeleteConfirmationModal
              isOpen={isDeleteModalOpen}
              onRequestClose={closeDeleteModal}
              onConfirmDelete={() => {
                handleDelete(deleteItemId);
                closeDeleteModal();
              }}
            />
          </ul>
        </div>
      )}
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
      <Snackbar
        open={Deletesnack}
        autoHideDuration={3000}
        onClose={() => setDeletesnack(false)}
      >
        <Alert
          onClose={() => setDeletesnack(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Data Deleted
        </Alert>
      </Snackbar>
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
          Data Created
        </Alert>
      </Snackbar>
      <Snackbar
        open={Movesnack}
        autoHideDuration={3000}
        onClose={() => setMovesnack(false)}
      >
        <Alert
          onClose={() => setMovesnack(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          Opportunity moved to Project section
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ViewOppor;
