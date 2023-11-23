const express = require("express");
const path = require("path");
const router = express.Router();
const dbFunctions = require("../../database/dbFunctions");
const bodyParser = require("body-parser");

let currentUser = "";

router.use(bodyParser.json());

router.get("/senstower", (req, res) => {
  const filePath = path.join(__dirname, "../..", "public", "index.html");
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error serving the file:", err);
      res.status(404).send("File not found");
    }
  });
});

router.get("/rolle", async (req, res) => {
  const username = currentUser;

  const query = `SELECT "rolle"
  FROM senstower."user"
  WHERE "userID" = '${username}'`;

  try {
    let Rolle = await dbFunctions.queryDatabase(query);
    Rolle = Rolle[0].rolle;
    res.send({ username, Rolle });
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/logout", (req, res) => {
  console.log("logout Route running");
  currentUser = "";
  res.status(200);
});

router.post("/senstower", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const queryPass = `SELECT "password"
  FROM senstower."user"
  WHERE "userID" = '${username}'`;

  const queryRole = `SELECT "rolle"
  FROM senstower."user"
  WHERE "userID" = '${username}'`;

  try {
    const comparePassword = await dbFunctions.queryDatabase(queryPass);
    const rolle = await dbFunctions.queryDatabase(queryRole);
    if (comparePassword[0].password === password) {
      currentUser = username;
      console.log(rolle[0].rolle);
      if (rolle[0].rolle == 0) {
        const filePath = path.join(__dirname, "../..", "public", "menu.html");
        res.sendFile(filePath, (err) => {
          if (err) {
            console.error("Error serving the file:", err);
            res.status(404).send("File not found");
          }
        });
      } else {
        const filePath = path.join(__dirname, "../..", "public", "main.html");
        res.sendFile(filePath, (err) => {
          if (err) {
            console.error("Error serving the file:", err);
            res.status(404).send("File not found");
          }
        });
      }
    } else {
      console.log("wrong username or password");
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    // Handle the error and send an appropriate response
    res.status(500).send("Internal Server Error");
  }
});

router.post("/api/benutzerverwaltung", async (req, res) => {
  const userID = req.body.userID;
  const password = req.body.password;
  const rolle = req.body.rolle;

  const query = `INSERT INTO senstower."user" ("userID", "password", "rolle") VALUES ('${userID}', '${password}', ${rolle})`;
  try {
    const result = await dbFunctions.queryDatabase(query);
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ Error: err });
  }
});

router.get("/benutzerverwaltung", (req, res) => {
  const filePath = path.join(
    __dirname,
    "..",
    "public",
    "benutzerverwaltung.html"
  );
  res.sendFile(filePath);
});

module.exports = router;
