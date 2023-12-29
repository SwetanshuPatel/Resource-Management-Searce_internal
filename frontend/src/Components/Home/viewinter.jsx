import axios from "axios";
import "./opporeffect.css";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "./deleteconfirm";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function ViewInter() {
  const [response, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editableField, setEditableField] = useState(null);
  const [editableValue, setEditableValue] = useState({});
  const navigate = useNavigate();
  const [Editsnack, setEditsnack] = React.useState(false);
  const [Deletesnack, setDeletesnack] = React.useState(false);
  const [organizer, setorganizer] = useState([]);
  const [dandt, setdandt] = useState([]);
  const [actionid, setactionid] = useState([]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    getData();

    //GET DISTINCT ORGANIZER
    axios
      .get("http://localhost:3000/home/getorganizer")
      .then((response) => {
        setorganizer(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resources", error);
      });

    //GET DISTINCT DATE AND TIME
    axios
      .get("http://localhost:3000/home/getdandt")
      .then((response) => {
        setdandt(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resources", error);
      });

    //GET DISTINCT ACTION ITEM ID
    axios
      .get("http://localhost:3000/home/getactionid")
      .then((response) => {
        setactionid(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resources", error);
      });      
  }, []);

  const getData = async () => {
    try {
      const { data, status } = await axios.get(
        "http://localhost:3000/home/view_inter"
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
      .delete(`http://localhost:3000/delete_inter/${id}`)
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
    setEditableField(item.interaction_id);
    setEditableValue({
      organizer: item.organizer,
      project_name: item.project_name,
      date_and_time: item.date_and_time,
      action_item_id: item.action_item_id,
      summary: item.summary
    });
  };

  const handleSave = (item) => {
    item.organizer = editableValue.organizer;
    item.project_name = editableValue.project_name;
    item.date_and_time = editableValue.date_and_time;
    item.action_item_id = editableValue.action_item_id;
    item.summary = editableValue.summary;

    axios
      .put(`http://localhost:3000/home/update_inter/${item.interaction_id}`, {
        organizer: item.organizer,
        project_name: item.project_name,
        date_and_time: item.date_and_time,
        action_item_id: item.action_item_id,
        summary: item.summary
      })
      .then((response) => {
        console.log(response.data);
        setEditsnack(true);
      })
      .catch((error) => {
        console.error(error);
      });

    setEditableField(null);
  };

  const [expandedCardId, setExpandedCardId] = useState(null);

  const handleCardClick = useCallback((e, itemId) => {
    const isCardClick =
      e.target.classList.contains('card') &&
      !e.target.classList.contains('edit-button') &&
      !e.target.classList.contains('delete-button');

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
              navigate("/Home/CreateInter");
            }}
            className="border border-1 border-white p-2 hover:bg-blue-500 hover:text-white"
          >
            <AddIcon /> Add Interaction
          </button>
          <ul className="card-container">
            {response.map((item) => (
              <div
                className={`list-item card ${
                  expandedCardId === item.interaction_id ? "active" : ""
                }`}
                key={item.interaction_id}
                onClick={(e) => handleCardClick(e, item.opportunity_id)}
              >
                <div
                  className="card-front"
                  onClick={() => setExpandedCardId(item.interaction_id)}
                >
                  <strong>Project Name:</strong> {item.project_name}
                </div>
                <div className="card-back">
                <strong>Project Name:</strong>{" "}
                  {editableField === item.interaction_id ? (
                    <span>
                      <Autocomplete
                        value={editableValue.project_name}
                        onChange={(e, newValue) =>
                          setEditableValue({
                            ...editableValue,
                            project_name: newValue,
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
                    <span>{item.project_name}</span>
                  )}
                  <hr width = '90%' color = 'black'></hr>
                  <br></br>
                  <strong>Organizer:</strong>{" "}
                  {editableField === item.interaction_id ? (
                    <span>
                      <Autocomplete
                        value={editableValue.organizer}
                        onChange={(e, newValue) =>
                          setEditableValue({
                            ...editableValue,
                            organizer: newValue,
                          })
                        }
                        options={organizer}
                        freeSolo
                        onInputChange={(e, newInputValue) => {
                          return newInputValue;
                        }}
                        getOptionSelected={(option, value) => option === value}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </span>
                  ) : (
                    <span>{item.organizer}</span>
                  )}
                  <br></br>
                  <strong>Date & Time:</strong>{" "}
                  {editableField === item.interaction_id ? (
                    <span>
                      <Autocomplete
                        value={editableValue.date_and_time}
                        onChange={(e, newValue) =>
                          setEditableValue({
                            ...editableValue,
                            date_and_time: newValue,
                          })
                        }
                        options={dandt}
                        freeSolo
                        onInputChange={(e, newInputValue) => {
                          return newInputValue;
                        }}
                        getOptionSelected={(option, value) => option === value}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </span>
                  ) : (
                    <span>{item.date_and_time}</span>
                  )}
                  <br></br>
                  <strong>Action Item ID:</strong>{" "}
                  {editableField === item.interaction_id ? (
                    <span>
                      <Autocomplete
                        value={editableValue.action_item_id}
                        onChange={(e, newValue) =>
                          setEditableValue({
                            ...editableValue,
                            action_item_id: newValue,
                          })
                        }
                        options={actionid}
                        freeSolo
                        onInputChange={(e, newInputValue) => {
                          return newInputValue;
                        }}
                        getOptionSelected={(option, value) => option === value}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </span>
                  ) : (
                    <span>{item.action_item_id}</span>
                  )}
                  <br/>
                  <strong>Summary:</strong>{" "}
                  {editableField === item.interaction_id ? (
                    <span>
                      <Autocomplete
                        value={editableValue.summary}
                        onChange={(e, newValue) =>
                          setEditableValue({
                            ...editableValue,
                            summary: newValue,
                          })
                        }
                        freeSolo
                        onInputChange={(e, newInputValue) => {
                          return newInputValue;
                        }}
                        getOptionSelected={(option, value) => option === value}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </span>
                  ) : (
                    <span>{item.summary}</span>
                  )}
                </div>
                <div className="button-container">
                  <div className="button-wrapper">
                    {editableField === item.interaction_id ? (
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
                      onClick={() => openDeleteModal(item.interaction_id)}
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
    </div>
  );
}

export default ViewInter;
