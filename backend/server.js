const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

const opporview = require("./opporview.js");
const projview = require("./projview.js");
const interview = require("./interview.js");
const resourview = require("./resourview.js");
const AcIview = require("./AcIview.js");
const UtiView = require("./utiview.js");

function checknumber(str) {
  return /^[0-9]+$/.test(str);
}

//DATABASE CONNECTION
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
//------------------------------------------------------------------------
//AUTHENTICATION
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length === 1) {
      res.status(200).json({ message: "Authentication successful" });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }

    client.release();
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//CREATE NEW USER
app.post("/Signup", async (req, res) => {
  const { username, email, password } = req.body;
  const values = [username, email, password];

  const query = "INSERT INTO USERS VALUES ($1, $3, $2)";

  await pool.query(query, values, (err) => {
    if (err) {
      console.error("Error Inserting: ", err);
      res.status(500).send("Error Inserting");
    } else {
      res.status(200).send("Data Added");
    }
  });
});
//-------------------------------------------------------------------------

//OPPORTUNITIES
//VIEW
app.get("/home/view_oppor", async (req, res) => {
  try {
    const data = await opporview.runOppQuery();
    console.log("Data from the server:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error during query:", error);

    res.status(500).json({ error: "Server error" });
  }
});

//DELETE
app.delete("/delete_oppor/:id", (req, res) => {
  const itemId = req.params.id;

  const query = "DELETE FROM opportunities WHERE opportunity_id = $1";
  const values = [itemId];

  pool.query(query, values, (err) => {
    if (err) {
      console.error("Error deleting data:", err);
      res.status(500).send("Error deleting data");
    } else {
      res.status(200).send("Data deleted successfully");
    }
  });
});

//CREATE
app.post("/home/create_oppor", async (req, res) => {
  const {
    cname,
    pname,
    amount,
    oname,
    stage,
    date,
    rid,
    resources,
    projname,
    region,
  } = req.body;
  const values = [
    cname,
    pname,
    Number.parseInt(amount),
    oname,
    stage,
    date,
    Number.parseInt(rid),
    resources,
    projname,
    region,
  ];

  const query =
    "INSERT INTO OPPORTUNITIES VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";

  await pool.query(query, values, (err) => {
    if (err) {
      console.error("Error Inserting: ", err);
      res.status(500).send("Error Inserting");
    } else {
      res.status(200).send("Data Added");
    }
  });
});

//EDIT
app.put("/home/update_oppor/:id", async (req, res) => {
  const itemid = req.params.id;
  const {
    opportunity_name,
    consultant_name,
    poc_name,
    estimated_amount,
    stage,
    closure_date,
    resource_id,
    resource_name,
    project_name,
    region,
  } = req.body;

  const query =
    "UPDATE OPPORTUNITIES SET opportunity_name = $1, consultant_name = $2, poc_name = $3, estimated_amount = $4, stage = $5, closure_date = $6, resource_id = $7, resource_name = $8, project_name = $9, region = $10 WHERE opportunity_id = $11";

  const values = [
    opportunity_name,
    consultant_name,
    poc_name,
    Number.parseInt(estimated_amount),
    stage,
    closure_date,
    Number.parseInt(resource_id),
    resource_name,
    project_name,
    region,
    itemid,
  ];

  await pool.query(query, values, (err) => {
    if (err) {
      console.error("Error editing: ", err);
      res.status(500).send("Error editing");
    } else {
      res.status(200).send("Data Edited");
    }
  });
});

//MOVE
app.post("/home/move_oppor/:id", async (req, res) => {
  const itemid = req.params.id;
  const {
    estimated_amount,
    stage,
    start_date,
    closure_date,
    resource_id,
    resource_name,
    project_name,
    region,
  } = req.body;
  const values = [
    project_name,
    stage,
    closure_date,
    resource_name,
    region,
    Number.parseInt(estimated_amount),
    start_date,
    Number.parseInt(resource_id),
  ];

  const query = "INSERT INTO PROJECTS VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";

  try {
    await pool.query(query, values);
    res.status(200).send("Data Moved");
  } catch (err) {
    console.error("Error Moving: ", err);
    res.status(500).send("Error Moving");
  }
});

//GET CONSULTANT
app.get("/home/getconsult", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT(consultant_name) FROM opportunities"
    );
    client.release();
    const consultNames = result.rows.map((row) => row.consultant_name);
    res.json(consultNames);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//GET POC
app.get("/home/getpoc", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT(poc_name) FROM opportunities"
    );
    client.release();
    const pocNames = result.rows.map((row) => row.poc_name);
    res.json(pocNames);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//GET STAGE
app.get("/home/getstage", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT(stage) FROM opportunities"
    );
    client.release();
    const stage = result.rows.map((row) => row.stage);
    res.json(stage);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//GET RESOURCE
app.get("/home/getresource", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT(resource_name) FROM opportunities"
    );
    client.release();
    const resourNames = result.rows.map((row) => row.resource_name);
    res.json(resourNames);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//GET PROJECT
app.get("/home/getproject", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT(project_name) FROM opportunities"
    );
    client.release();
    const projectNames = result.rows.map((row) => row.project_name);
    res.json(projectNames);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//GET DISTINCT REGIONS
app.get("/home/getregion", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT(region) FROM opportunities"
    );
    client.release();
    const region = result.rows.map((row) => row.region);
    res.json(region);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//-------------------------------------------------------------------------
//PROJECT
//VIEW
app.get("/home/view_proj", async (req, res) => {
  try {
    const data = await projview.runProjQuery();
    console.log("Data from the server:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error during query:", error);

    res.status(500).json({ error: "Server error" });
  }
});

//CREATE
app.post("/home/create_proj", async (req, res) => {
  const { name, stage, ddate, r_id, rname, region, budget, sdate } = req.body;
  const values = [
    name,
    stage,
    ddate,
    rname,
    region,
    Number.parseInt(budget),
    sdate,
    r_id,
  ];

  const query = "INSERT INTO PROJECTS VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";

  await pool.query(query, values, (err) => {
    if (err) {
      console.error("Error Inserting: ", err);
      res.status(500).send("Error Inserting");
    } else {
      res.status(200).send("Data Added");
    }
  });
});

//DELETE
app.delete("/delete_proj/:id", (req, res) => {
  const itemId = req.params.id;

  const query = "DELETE FROM projects WHERE project_id = $1";
  const values = [itemId];

  pool.query(query, values, (err) => {
    if (err) {
      console.error("Error deleting data:", err);
      res.status(500).send("Error deleting data");
    } else {
      res.status(200).send("Data deleted successfully");
    }
  });
});

//EDIT
app.put("/home/update_Proj/:id", async (req, res) => {
  const itemid = req.params.id;
  const {
    project_name,
    project_stage,
    start_date,
    delivery_date,
    resource_name,
    region,
    resource_id,
  } = req.body;

  const query =
    "UPDATE PROJECTS SET project_name = $1, project_stage = $2, start_date = $3, delivery_date = $4, resource_name = $5, region = $6, resource_id = $7 WHERE project_id = $8";

  const values = [
    project_name,
    project_stage,
    start_date,
    delivery_date,
    resource_name,
    region,
    resource_id,
    itemid,
  ];

  await pool.query(query, values, (err) => {
    if (err) {
      console.error("Error editing: ", err);
      res.status(500).send("Error editing");
    } else {
      res.status(200).send("Data Edited");
    }
  });
});

//UPDATE ADD RESOURCE
app.put("/home/update_resourProj/:id", async (req, res) => {
  const itemid = req.params.id;
  const {
    project_name,
    project_stage,
    start_date,
    delivery_date,
    resource_name,
    region,
    budget,
    resource_id,
  } = req.body;

  const query = "INSERT INTO PROJECTS VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";

  const values = [
    project_name,
    project_stage,
    delivery_date,
    resource_name,
    region,
    budget,
    start_date,
    resource_id,
  ];

  await pool.query(query, values, (err) => {
    if (err) {
      console.error("Error editing: ", err);
      res.status(500).send("Error editing");
    } else {
      res.status(200).send("Data Edited");
    }
  });
});

//GET PROJECT STAGE
app.get("/home/getstage1", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT(project_stage) FROM projects"
    );
    client.release();
    const stage = result.rows.map((row) => row.project_stage);
    res.json(stage);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//GET BUDGET
app.get("/home/getbudget", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT DISTINCT(budget) FROM projects");
    client.release();
    const budget = result.rows.map((row) => row.budget);
    res.json(budget);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//GET PROJECT START DATE
app.get("/home/getdate1", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT(start_date) FROM projects"
    );
    client.release();
    const date1 = result.rows.map((row) => row.start_date);
    res.json(date1);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//GET PROJECT DELIVERY DATE
app.get("/home/getdate2", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT(delivery_date) FROM projects"
    );
    client.release();
    const date2 = result.rows.map((row) => row.delivery_date);
    res.json(date2);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//GET PROJECT RESOURCE NAME
app.get("/home/getresource1", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT(resource_name) FROM projects"
    );
    client.release();
    const resourName = result.rows.map((row) => row.resource_name);
    res.json(resourName);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//GET PROJECT REGION
app.get("/home/getregion1", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT DISTINCT(region) FROM projects");
    client.release();
    const region = result.rows.map((row) => row.region);
    res.json(region);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//-------------------------------------------------------------------------
//INTERACTIONS
//VIEW
app.get("/home/view_inter", async (req, res) => {
  try {
    const data = await interview.runInterQuery();
    console.log("Data from the server:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error during query:", error);

    res.status(500).json({ error: "Server error" });
  }
});

//CREATE
app.post("/home/create_inter", async (req, res) => {
  const { organizer, pname, date, summary } = req.body;
  const values = [organizer, pname, date, summary];

  const query = "INSERT INTO INTERACTIONS VALUES ($1, $2, $3, $4)";

  await pool.query(query, values, (err) => {
    if (err) {
      console.error("Error Inserting: ", err);
      res.status(500).send("Error Inserting");
    } else {
      res.status(200).send("Data Added");
    }
  });
});

//DELETE
app.delete("/delete_inter/:id", (req, res) => {
  const itemId = req.params.id;

  const query = "DELETE FROM interactions WHERE interaction_id = $1";
  const values = [itemId];

  pool.query(query, values, (err) => {
    if (err) {
      console.error("Error deleting data:", err);
      res.status(500).send("Error deleting data");
    } else {
      res.status(200).send("Data deleted successfully");
    }
  });
});

//EDIT
app.put("/home/update_inter/:id", async (req, res) => {
  const itemid = req.params.id;
  const { organizer, project_name, date_and_time, action_item_id } = req.body;

  const query =
    "UPDATE INTERACTIONS SET organizer = $1, project_name = $2, date_and_time = $3, action_item_id = $4 WHERE interaction_id = $5";

  const values = [
    organizer,
    project_name,
    date_and_time,
    Number.parseInt(action_item_id),
    itemid,
  ];

  await pool.query(query, values, (err) => {
    if (err) {
      console.error("Error editing: ", err);
      res.status(500).send("Error editing");
    } else {
      res.status(200).send("Data Edited");
    }
  });
});

//GET ORGANIZER
app.get("/home/getorganizer", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT(organizer) FROM interactions"
    );
    client.release();
    const organizer = result.rows.map((row) => row.organizer);
    res.json(organizer);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//GET DATE AND TIME
app.get("/home/getdandt", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT(date_and_time) FROM interactions"
    );
    client.release();
    const dandt = result.rows.map((row) => row.date_and_time);
    res.json(dandt);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//GET ACTION ITEM ID
app.get("/home/getactionid", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT(action_item_id) FROM interactions"
    );
    client.release();
    const action_item_id = result.rows.map((row) => row.action_item_id);
    res.json(action_item_id);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
//-------------------------------------------------------------------------

//RESOURCES
//VIEW
app.get("/home/view_resour", async (req, res) => {
  try {
    const data = await resourview.runResourQuery();
    console.log("Data from the server:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error during query:", error);

    res.status(500).json({ error: "Server error" });
  }
});

//CREATE
app.post("/home/create_resour", async (req, res) => {
  const { r_id, rname, currproject, timeon, timeoff, skill } = req.body;
  const values = [rname, currproject, timeon, timeoff, skill, r_id];

  const query = "INSERT INTO RESOURCES VALUES ($1, $2, $3, $4, $5, $6)";

  await pool.query(query, values, (err) => {
    if (err) {
      console.error("Error Inserting: ", err);
      res.status(500).send("Error Inserting");
    } else {
      res.status(200).send("Data Added");
    }
  });
});

//DELETE
app.delete("/delete_resour/:id", (req, res) => {
  const itemId = req.params.id;

  const query = "DELETE FROM resources WHERE project_id = $1";
  const values = [itemId];

  pool.query(query, values, (err) => {
    if (err) {
      console.error("Error deleting data:", err);
      res.status(500).send("Error deleting data");
    } else {
      res.status(200).send("Data deleted successfully");
    }
  });
});

//EDIT
app.put("/home/update_resour/:id", async (req, res) => {
  try {
    const itemid = req.params.id;
    const { resourlabel, projlabel, ontime, offtime, skill } = req.body;
    const query =
      "UPDATE RESOURCES SET resource_name = $1, project_assigned = $2, time_on_project = $3, time_off_project = $4, skill_learned_learning = $5 WHERE project_id = $6";

    const values = [resourlabel, projlabel, ontime, offtime, skill, itemid];

    await pool.query(query, values);

    res.status(200).send("Data Edited");
  } catch (err) {
    console.error("Error editing: ", err);
    res.status(500).send("Error editing");
  }
});

//GET PROJECT ASSIGNED
app.get("/home/getprojassign", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT(project_assigned) FROM resources"
    );
    client.release();
    const currproj = result.rows.map((row) => row.project_assigned);
    res.json(currproj);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//GET TIME ON PROJECT
app.get("/home/gettimeon", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT(time_on_project) FROM resources"
    );
    client.release();
    const timeon = result.rows.map((row) => row.time_on_project);
    res.json(timeon);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//GET TIME OFF PROJECT
app.get("/home/gettimeoff", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT(time_off_project) FROM resources"
    );
    client.release();
    const timeoff = result.rows.map((row) => row.time_off_project);
    res.json(timeoff);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//GET SKILLS
app.get("/home/getskills", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT(skill_learned_learning) FROM resources"
    );
    client.release();
    const skills = result.rows.map((row) => row.skill_learned_learning);
    res.json(skills);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
//-------------------------------------------------------------------------

//ACTION ITEM
//VIEW
app.get("/home/view_AcI", async (req, res) => {
  try {
    const data = await AcIview.runAcIQuery();
    console.log("Data from the server:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error during query:", error);

    res.status(500).json({ error: "Server error" });
  }
});

//CREATE
app.post("/home/create_AcI", async (req, res) => {
  const { A_id, pname, step } = req.body;
  const values = [Number.parseInt(A_id), pname, step];

  const query = "INSERT INTO ACTION_ITEM VALUES ($1, $2, $3)";

  await pool.query(query, values, (err) => {
    if (err) {
      console.error("Error Inserting: ", err);
      res.status(500).send("Error Inserting");
    } else {
      res.status(200).send("Data Added");
    }
  });
});

//DELETE
app.delete("/delete_AcI/:id", (req, res) => {
  const itemId = req.params.id;

  const query = "DELETE FROM action_item WHERE action_item_id = $1";
  const values = [itemId];

  pool.query(query, values, (err) => {
    if (err) {
      console.error("Error deleting data:", err);
      res.status(500).send("Error deleting data");
    } else {
      res.status(200).send("Data deleted successfully");
    }
  });
});

//EDIT
app.put("/home/update_AcI/:id", async (req, res) => {
  const itemid = req.params.id;
  const { action_item_id, project_name, next_step } = req.body;
  const query =
    "UPDATE ACTION_ITEM SET action_item_id = $1, project_name = $2, next_step = $3 WHERE action_item_id = $4";

  const values = [action_item_id, project_name, next_step, itemid];

  await pool.query(query, values, (err) => {
    if (err) {
      console.error("Error editing: ", err);
      res.status(500).send("Error editing");
    } else {
      res.status(200).send("Data Edited");
    }
  });
});

//GET ACTION ITEM ID
app.get("/home/getactionid1", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT(action_item_id) FROM action_item"
    );
    client.release();
    const id = result.rows.map((row) => row.action_item_id);
    res.json(id);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//GET NEXT STEP
app.get("/home/getnextstep", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT(next_step) FROM action_item"
    );
    client.release();
    const step = result.rows.map((row) => row.next_step);
    res.json(step);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
//---------------------------------------------------------------------------------

//UTILIZATION
//VIEW
app.get("/home/view_Uti", async (req, res) => {
  try {
    const data = await UtiView.runUtiQuery();
    console.log("Data from the server:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error during query:", error);

    res.status(500).json({ error: "Server error" });
  }
});

//CREATE
app.post("/home/create_Uti", async (req, res) => {
  const { uti_id, rname, pname, bill } = req.body;
  const values = [Number.parseInt(uti_id), rname, pname, Number.parseInt(bill)];

  const query = "INSERT INTO UTILIZATION VALUES ($1, $2, $3, $4)";

  await pool.query(query, values, (err) => {
    if (err) {
      console.error("Error Inserting: ", err);
      res.status(500).send("Error Inserting");
    } else {
      res.status(200).send("Data Added");
    }
  });
});

//DELETE
app.delete("/delete_Uti/:id", (req, res) => {
  const itemId = req.params.id;
  const query = "DELETE FROM utilization WHERE utilization_id = $1";
  const values = [itemId];

  pool.query(query, values, (err) => {
    if (err) {
      console.error("Error deleting data:", err);
      res.status(500).send("Error deleting data");
    } else {
      res.status(200).send("Data deleted successfully");
    }
  });
});

//EDIT
app.put("/home/edit_Uti/:id", async (req, res) => {
  const itemid = req.params.id;
  let { resourlabel, projlabel, bill } = req.body;
  const query =
    "UPDATE UTILIZATION SET resource_name = $1, project_name = $2, billable_in_percent = $3 where utilization_id = $4";

  const values = [
    resourlabel,
    projlabel,
    Number.parseInt(bill),
    Number.parseInt(itemid),
  ];

  await pool.query(query, values, (err) => {
    if (err) {
      console.error("Error editing: ", err);
      res.status(500).send("Error editing");
    } else {
      res.status(200).send("Data Edited");
    }
  });
});

//GET RESOURCES
app.get("/home/getresources", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT(resource_name) FROM utilization"
    );
    client.release();
    const resourceNames = result.rows.map((row) => row.resource_name);
    res.json(resourceNames);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//GET PROJECTS
app.get("/home/getprojects", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT project_name FROM utilization");
    client.release();
    const projectNames = result.rows.map((row) => row.project_name);
    res.json(projectNames);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//---------------------------------------------------------------------------------
//DASHBOARD
//REVENUE
app.get("/home/budget", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT SUM(total_budget) AS sum FROM (SELECT project_name, SUM(DISTINCT budget) AS total_budget FROM projects GROUP BY project_name);"
    );
    client.release();
    const sum = result.rows[0].sum;
    res.status(200).json({ sum });
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//CUSTOMER
app.get("/home/customer", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "select count(distinct project_name) from projects"
    );
    client.release();
    const count = result.rows[0].count;
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//RESOURCE
app.get("/home/resource", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "select count(distinct resource_name) from resources"
    );
    client.release();
    const count = result.rows[0].count;
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//PROGRESS
app.get("/home/progress", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT (SUM(billable_in_percent) / COUNT(billable_in_percent)) as result FROM utilization"
    );
    client.release();
    const answer = result.rows[0].result;
    res.status(200).json({ answer });
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//FORECAST
app.get("/home/forecast", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "select sum(estimated_amount) from opportunities"
    );
    client.release();
    const sum = result.rows[0].sum;
    res.status(200).json({ sum });
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//REVENUE CHART
app.get("/home/getrevenueData", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT project_name, budget FROM projects group by project_name, budget"
    );
    client.release();
    const projectData = result.rows.map((row) => ({
      project_name: row.project_name,
      budget: row.budget,
    }));
    res.status(200).json(projectData);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//PROGRESS CHART
app.get("/home/getprogressData", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT project_name, billable_in_percent FROM utilization"
    );
    client.release();
    const progressData = result.rows.map((row) => ({
      project_name: row.project_name,
      billable_in_percent: row.billable_in_percent,
    }));
    res.status(200).json(progressData);
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//RESOURCE DATA
app.get("/home/getresourceData", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT(resource_name) FROM utilization  ORDER BY resource_name"
    );
    client.release();
    if (result.rows && result.rows.length > 0) {
      const progressData = result.rows.map((row) => row.resource_name);
      res.status(200).json(progressData);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//GET OPPORTUNITY COUNT
app.get("/home/opporcount", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "select count(project_name) from opportunities"
    );
    client.release();
    const count = result.rows[0].count;
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//GET TABLE DATA
app.get("/home/tabledata", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT DISTINCT(resource_name), STRING_AGG(project_name, ', ') AS projects, STRING_AGG(billable_in_percent::text, ', ') AS utilizations FROM utilization GROUP BY resource_name ORDER BY resource_name"
    );
    client.release();
    if (result.rows && result.rows.length > 0) {
      const responseData = result.rows.map((row) => ({
        resource_name: row.resource_name,
        projects: row.projects,
        utilizations: row.utilizations,
      }));

      res.status(200).json(responseData);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//FREE RESOURCES NUMBER
app.get("/home/freenum", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT COUNT(DISTINCT resource_name) AS total_count FROM utilization WHERE billable_in_percent = 0;"
    );
    client.release();
    const count = result.rows[0].total_count;
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching resources", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//---------------------------------------------------------------------------------
//PORT LISTENING
// const { Client } = require('pg');

// const client = new Client({
//     connectionString: 'postgresql://user:password@0.tcp.in.ngrok.io:13408/mydb',
//     ssl: false
// });

// client.connect((err) => {
//     if (err) {
//         console.error('Connection error:', err.stack);
//     } else {
//         console.log('Connected to PostgreSQL database');
//     }
// });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
