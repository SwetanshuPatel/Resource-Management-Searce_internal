require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("cookie-session");
const app = express();
const passportSetup = require("./passport");
const authroute = require("./routes/auth");
const PORT = process.env.PORT;

app.use(
  session({
    name: "session",
    keys: ["secret_keys"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.use("/auth", authroute);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
