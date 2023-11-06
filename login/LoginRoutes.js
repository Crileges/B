const express = require("express");
const path = require("path");
const router = express.Router();
const dbFunctions = require("../database/dbFunctions");

let currentUser = "";

router.get("/", (req, res) => {
  //res.send("Hello World");
});

router.get("/rolle", async (req, res) => {
  const username = currentUser; // Use req.query for query parameters

  const query = `SELECT "rolle"
  FROM senstower."user"
  WHERE "userID" = '${username}'`;

  try {
    let rolle = await dbFunctions.queryDatabase(query);
    rolle = rolle[0].rolle;
    res.send({ username, rolle }); // Send the username and rolle as an object
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/senstower", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // You can perform authentication or any other processing here
  const queryPass = `SELECT "password"
  FROM senstower."user"
  WHERE "userID" = '${username}'`;

  try {
    const comparePassword = await dbFunctions.queryDatabase(queryPass);
    if (comparePassword[0].password === password) {
      currentUser = username;
      //load app
      const filePath = path.join(__dirname, "..", "public", "main.html");
      res.sendFile(filePath, (err) => {
        if (err) {
          console.error("Error serving the file:", err);
          res.status(404).send("File not found");
        }
      });
    } else {
      console.log("wrong username or password");
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    // Handle the error and send an appropriate response
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
