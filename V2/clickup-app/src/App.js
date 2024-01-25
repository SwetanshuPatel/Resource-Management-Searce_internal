import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.clickup.com/api/v2/task",
          {
            headers: {
              Authorization: process.env.REACT_APP_CLICKUP_API_KEY,
            },
          }
        );
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching data from ClickUp:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>ClickUp Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
