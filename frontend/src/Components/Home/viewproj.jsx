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
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ViewProj() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [Deletesnack, setDeletesnack] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, status } = await axios.get(
        "http://localhost:3000/home/view_proj"
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
        .split(", ")
        .map((p_id) => Number.parseInt(p_id, 10));

      const resource_id = item.resource_id
        .split(", ")
        .map((r_id) => Number.parseInt(r_id, 10));

      const budget = item.budget
        .split(", ")
        .map((budget) => Number.parseInt(budget, 10));

      return {
        ...item,
        project_id: project_id,
        resource_id: resource_id,
        resource_name: item.resource_name.split(", "),
        project_stage: item.project_stage.split(", "),
        delivery_date: item.delivery_date.split(", "),
        start_date: item.start_date.split(", "),
        region: item.region.split(", "),
        budget: budget,
      };
    });
  };

  const handleDelete = (id) => {
    console.log("Deleting item with ID:", id);
    axios
      .delete(`http://localhost:3000/delete_proj/${id}`)
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

  const handleNewData = (item) => {
    navigate(`/Home/NewresourceProj/${item}`, { state: item });
  };

  const handleEdit = (item) => {
    navigate(`/Home/EditProj/${item}`, { state: item });
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
                navigate("/Home/CreateProj");
              }}
              className="border border-1 border-white p-2 hover:bg-blue-500 hover:text-white"
            >
              <AddIcon /> Add Project
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
                        <strong>Project Name:</strong> {item.project_name}
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
                          <th>Resource Name</th>
                          <th>Start Date</th>
                          <th>Delivery Date</th>
                          <th>Project Stage</th>
                          <th>Region</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.project_id.map((p_id, idindex) => (
                          <tr key={idindex}>
                            <td>{item.resource_name[idindex]}</td>
                            <td>{item.start_date[idindex]}</td>
                            <td>{item.delivery_date[idindex]}</td>
                            <td>{item.project_stage[idindex]}</td>
                            <td>{item.region[idindex]}</td>
                            <td>
                              <div className="button-wrapper">
                                <button
                                  className="add-button"
                                  onClick={() => {
                                    const editData = {
                                      p_id: Number.parseInt(p_id),
                                      projectName: item.project_name,
                                      resourceName: item.resource_name[idindex],
                                      sdate: item.start_date[idindex],
                                      ddate: item.delivery_date[idindex],
                                      projstage: item.project_stage[idindex],
                                      region: item.region[idindex],
                                      budget: item.budget[idindex],
                                      resource_id: item.resource_id[idindex]
                                    };
                                    handleNewData(editData);
                                  }}
                                >
                                  <PersonAddIcon />
                                </button>
                              </div>
                              <div className="button-wrapper">
                                <button
                                  className="edit-button"
                                  onClick={() => {
                                    const editData = {
                                      p_id: Number.parseInt(p_id),
                                      projectName: item.project_name,
                                      resourceName: item.resource_name[idindex],
                                      sdate: item.start_date[idindex],
                                      ddate: item.delivery_date[idindex],
                                      projstage: item.project_stage[idindex],
                                      region: item.region[idindex],
                                      resource_id: item.resource_id[idindex]
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
                                    openDeleteModal(Number.parseInt(p_id))
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

export default ViewProj;
