const express = require("express");
const path = require("path");
const router = express.Router();
const dbFunctions = require("../../database/dbFunctions");
const bodyParser = require("body-parser");

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

router.delete("/api/benutzerverwaltung", async (req, res) => {
  console.log("Request Body:", req.body);
  const userID = req.body.deleteUserID;
  const deleteQuery = `DELETE FROM senstower."user" WHERE "userID" = '${userID}'`;
  try {
    await dbFunctions.queryDatabase(deleteQuery);
    res.status(200).send({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ Error: "Failed to delete user", Details: err.message });
  }
});

router.get("/api/benutzerverwaltung", async (req, res) => {
  const selectQuery = 'SELECT * FROM senstower."user"';
  try {
    const result = await dbFunctions.queryDatabase(selectQuery);
    console.log(result);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(result);
  } catch (err) {
    console.error("Error fetching users:", err);
    res
      .status(500)
      .send({ Error: "Failed to fetch users", Details: err.message });
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
