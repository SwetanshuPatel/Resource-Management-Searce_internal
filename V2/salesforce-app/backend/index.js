const express = require("express");
require("dotenv").config();
const cors = require("cors");
const jsforce = require("jsforce");
const app = express();

app.use(cors());

const { SF_LOGIN_URL, SF_USERNAME, SF_PASSWORD, SF_TOKEN, PORT } = process.env;

const conn = new jsforce.Connection({
  loginUrl: SF_LOGIN_URL,
});

conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, (err, UserInfo) => {
  if (err) {
    console.error(err);
  } else {
    console.log("User ID:" + UserInfo.id);
  }
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}/`);
});

app.get("/", (req, res) => {
  conn.query("SELECT Id, Name, Title, Company, Status FROM Lead", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log("Data Fetch: Success");
      res.json(result.records);
    }
  });
});
