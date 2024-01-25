import React, { useState, useEffect } from "react";
import axios from "axios";
import "./formModule.css";
import "./viewoppor.css";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "./deleteconfirm";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ViewResour() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [Deletesnack, setDeletesnack] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  //Fetch the data from the database
  const fetchData = async () => {
    try {
      const { data, status } = await axios.get(
        "http://localhost:3000/home/view_resour"
      );

      if (status === 200) {
        setLoading(false);
        setData(data);
        setExpandedItems(Array(data.length).fill(false));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const transformData = (data) => {
    return data.map((item) => {
      const project_id = item.project_id
      .split(",")
      .map((r_id) => Number.parseInt(r_id, 10));

      return {
        ...item,
        project_id: project_id,
        project_names: item.project_names.split(", "),
        time_on_project: item.time_on_project.split(", "),
        time_off_project: item.time_off_project.split(", "),
        skill_learned_learning: item.skill_learned_learning.split(", ")
      };
    });
  };

  const handleDelete = (id) => {
    console.log("Deleting item with ID:", id);
    axios
      .delete(`http://localhost:3000/delete_resour/${id}`)
      .then((response) => {
        console.log(response.data);
        fetchData();
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
    navigate(`/Home/EditResour/${item}`, { state: item });
  };

  return (
    <div>
      {loading ? (
        <p>Please Wait...</p>
      ) : (
        <ul className="pretty-list">
          <div style={{ display: "flex" }}>
            <button
              onClick={() => {
                navigate("/Home/CreateResour");
              }}
              className="border border-1 border-white p-2 hover:bg-blue-500 hover:text-white"
            >
              <AddIcon /> Add Resource
            </button>
          </div>
          <br />
          {transformData(data).map((item, index) => (
            <div
              className="list-item"
              style={{
                display: "flex",
                boxShadow: "1px 1px 2px 0px rgba(0,0,0,0.75)",
                backgroundColor: "white",
                padding: "16px",
                margin: "8px",
                borderRadius: "4px",
              }}
              key={index}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <table className="table-container">
                    <tr>
                      <td>
                        <strong>Resource Name:</strong> {item.resource_name}
                      </td>
                      <td style={{ paddingLeft: "75px" }}>
                        <strong>Resource ID: </strong>
                      </td>
                      <td>
                        {item.resource_id}
                      </td>
                    </tr>
                  </table>
                  <button
                    onClick={() =>
                      setExpandedItems((prevExpanded) => {
                        const newExpanded = [...prevExpanded];
                        newExpanded[index] = !newExpanded[index];
                        return newExpanded;
                      })
                    }
                    className="toggle-button"
                    style={{
                      marginLeft: "575px",
                      transition: "background-color 0.3s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#f0f0f0")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    {expandedItems[index] ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </button>
                </div>
                <hr width="100%" color="black"></hr>
                <br></br>
                {expandedItems[index] && (
                  <div>
                    <table className="table-with-border">
                      <thead>
                        <tr>
                          <th>Project Name</th>
                          <th>Time On Project</th>
                          <th>Time Off Project</th>
                          <th>Skill Learned/ Learning</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.project_id.map((r_id, idindex) => (
                          <tr key={idindex}>
                            <td>{item.project_names[idindex]}</td>
                            <td>{item.time_on_project[idindex]}</td>
                            <td>{item.time_off_project[idindex]}</td>
                            <td>{item.skill_learned_learning[idindex]}</td>
                            <td>
                              <div className="button-wrapper">
                                <button
                                  className="edit-button"
                                  onClick={() => {
                                    const editData = {
                                      r_id: Number.parseInt(r_id),
                                      projectName: item.project_names[idindex],
                                      resourceName: item.resource_name,
                                      projontime: item.time_on_project[idindex],
                                      projofftime: item.time_off_project[idindex],
                                      skill: item.skill_learned_learning[idindex]
                                    };
                                    handleEdit(editData);
                                  }}
                                >
                                  <CreateIcon />
                                </button>
                              </div>
                              <div className="button-wrapper">
                                <button
                                  className="delete-button"
                                  onClick={() =>
                                    openDeleteModal(Number.parseInt(r_id))
                                  }
                                >
                                  <DeleteIcon />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
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
      )}
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

export default ViewResour;