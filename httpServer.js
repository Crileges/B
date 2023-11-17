const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const loginRoutes = require("./login/LoginRoutes");
const dbFunctions = require("./database/dbFunctions");
const objekteRoutes = require("./objekte/ObjekteRoutes");
const patientenRoutes = require("./patienten/patientenRoute");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

dbFunctions.connectToDatabase();

// Serve static files (including your HTML file) from the "public" directory
app.use(express.static("public"));

//Routes
app.use("/", loginRoutes);
app.use("/", objekteRoutes);
app.use("/", patientenRoutes);

// Error Handler for 404 and 500 responses
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke!");
  res.status(500).send(err.stack);
});
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that. This URL is not supported.");
});

const port = 8080;
const ipAddress = "127.0.0.1";
//const ipAddress = "10.10.100.41";

app.listen(port, ipAddress, () => {
  console.log(
    `Express-App is running on IP address ${ipAddress} and Port ${port}`
  );
});
