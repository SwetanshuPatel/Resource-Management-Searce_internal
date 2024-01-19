import axios from "axios";
import "./formModule.css";
import "./viewoppor.css";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import SaveIcon from "@mui/icons-material/Save";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "./deleteconfirm";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function ViewAcI() {
  const [response, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editableField, setEditableField] = useState(null);
  const [editableValue, setEditableValue] = useState({});
  const navigate = useNavigate();
  const [Editsnack, setEditsnack] = React.useState(false);
  const [Deletesnack, setDeletesnack] = React.useState(false);
  const [actionid, setactionid] = useState([]);
  const [nextstep, setnextstep] = useState([]);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    getData();

    //GET DISTINCT ACTION ITEM ID
    axios
      .get("http://localhost:3000/home/getactionid1")
      .then((response) => {
        setactionid(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resources", error);
      });

    //GET DISTINCT NEXT STEP
    axios
      .get("http://localhost:3000/home/getnextstep")
      .then((response) => {
        setnextstep(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resources", error);
      });
  }, []);

  //Fetch the data from the database
  const getData = async () => {
    try {
      const { data, status } = await axios.get(
        "http://localhost:3000/home/view_AcI"
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
      .delete(`http://localhost:3000/delete_AcI/${id}`)
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
    setEditableField(item.action_item_id);
    setEditableValue({
      action_item_id: item.action_item_id,
      project_name: item.project_name,
      next_step: item.next_step,
    });
  };

  const handleSave = (item) => {
    item.action_item_id = editableValue.action_item_id;
    item.project_name = editableValue.project_name;
    item.next_step = editableValue.next_step;

    axios
      .put(`http://localhost:3000/home/update_AcI/${item.action_item_id}`, {
        action_item_id: item.action_item_id,
        project_name: item.project_name,
        next_step: item.next_step,
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
              navigate("/Home/CreateAcI");
            }}
            className="border border-1 border-white p-2 hover:bg-blue-500 hover:text-white"
          >
            <AddIcon /> Add Action Item
          </button>
          <ul className="card-container">
            {response.map((item) => (
              <div
                className={`list-item card ${
                  expandedCardId === item.action_item_id ? "active" : ""
                }`}
                key={item.action_item_id}
                onClick={(e) => handleCardClick(e, item.opportunity_id)}
              >
                <div
                  className="card-front"
                  onClick={() => setExpandedCardId(item.action_item_id)}
                >
                  <strong>Project Name:</strong> {item.project_name}
                </div>
                <div className="card-back">
                  <strong>Project Name:</strong>{" "}
                  {editableField === item.action_item_id ? (
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
                  <hr width="90%" color="black"></hr>
                  <br/>
                  <strong>Resource Name:</strong>{" "}
                  {editableField === item.action_item_id ? (
                    <span>
                      <Autocomplete
                        value={editableValue.resource_name}
                        onChange={(e, newValue) =>
                          setEditableValue({
                            ...editableValue,
                            resource_name: newValue,
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
                    <span>{item.resource_name}</span>
                  )}
                  
                  <br />
                  <strong>Action Item ID:</strong>{" "}
                  {editableField === item.action_item_id ? (
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
                  <br />
                  <strong>Next Step:</strong>{" "}
                  {editableField === item.action_item_id ? (
                    <span>
                      <Autocomplete
                        value={editableValue.next_step}
                        onChange={(e, newValue) =>
                          setEditableValue({
                            ...editableValue,
                            next_step: newValue,
                          })
                        }
                        options={nextstep}
                        freeSolo
                        onInputChange={(e, newInputValue) => {
                          return newInputValue;
                        }}
                        getOptionSelected={(option, value) => option === value}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </span>
                  ) : (
                    <span>{item.next_step}</span>
                  )}
                </div>
                <div className="button-container">
                  <div className="button-wrapper">
                    <button
                      className="complete-button"
                      onClick={() => handleDelete(item.action_item_id)}
                    >
                      <LibraryAddCheckIcon />
                    </button>
                  </div>
                  <div className="button-wrapper">
                    {editableField === item.action_item_id ? (
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
                      onClick={() => openDeleteModal(item.action_item_id)}
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

export default ViewAcI;
