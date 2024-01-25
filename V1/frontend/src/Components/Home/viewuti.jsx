import React, { useState, useEffect } from "react";
import axios from "axios";
import "./formModule.css";
import "./viewoppor.css";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import DeleteConfirmationModal from "./deleteconfirm";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ViewUti() {
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
        "http://localhost:3000/home/view_Uti"
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

  //Transforming the data to be displayed which can then be editted and saved successfully in the database, this is done because the data fetched is in the form of a complex query
  const transformData = (data) => {
    return data.map((item) => {
      const utilizations = item.utilizations
        .split(",")
        .map((utilization) => Number.parseInt(utilization, 10));

      const utilization_id = item.utilization_id
        .split(",")
        .map((u_id) => Number.parseInt(u_id, 10));

      const sumUtilizations = utilizations.reduce(
        (total, utilization) => total + utilization,
        0
      );

      let freeuti = 100 - sumUtilizations;

      let message = "";

      if (freeuti < 0) {
        freeuti = 0;
        message =
          "Please check the utilization again... Utilization less than 0";
      }

      return {
        ...item,
        project_names: item.project_names.split(", "),
        utilizations: utilizations,
        utilization_id: utilization_id,
        freeuti: freeuti,
        message: message,
      };
    });
  };

  const handleDelete = (id) => {
    console.log("Deleting item with ID:", id);
    axios
      .delete(`http://localhost:3000/delete_Uti/${id}`)
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
    navigate(`/Home/EditUti/${item}`, { state: item });
  };

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "110%", mr: 1 }}>
          <LinearProgress variant="determinate" value={props.value} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <div>
      {loading ? (
        <p>Please Wait...</p>
      ) : (
        <ul className="pretty-list">
          <div style={{ display: "flex" }}>
            <button
              onClick={() => {
                navigate("/Home/CreateUti");
              }}
              className="border border-1 border-white p-2 hover:bg-blue-500 hover:text-white"
            >
              <AddIcon /> Add Utilization
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
                        <strong>Availibility: </strong>
                      </td>
                      <td>
                        {LinearProgressWithLabel({ value: item.freeuti })}
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
                          <th>Utilization</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.utilization_id.map((u_id, idindex) => (
                          <tr key={idindex}>
                            <td>{item.project_names[idindex]}</td>
                            <td>
                              {LinearProgressWithLabel({
                                value: item.utilizations[idindex],
                              })}
                            </td>
                            <td>
                              <div className="button-wrapper">
                                <button
                                  className="edit-button"
                                  onClick={() => {
                                    const editData = {
                                      u_id: Number.parseInt(u_id),
                                      projectName: item.project_names[idindex],
                                      resourceName: item.resource_name,
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
                                    openDeleteModal(Number.parseInt(u_id))
                                  }
                                >
                                  <DeleteIcon />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td>{item.message && <p>{item.message}</p>}</td>
                        </tr>
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

export default ViewUti;
