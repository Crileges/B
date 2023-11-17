const express = require("express");
const path = require("path");
const router = express.Router();
const dbFunctions = require("../database/dbFunctions");

router.get("/patientenAll", async (req, res) => {
  //const query = "SELECT * FROM senstower.patient";
  const query = "SELECT * FROM senstower.patient";

  try {
    let result = await dbFunctions.queryDatabase(query);
    const response = { patients: result };
    console.log(response);
    res.json(response);
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/patientenPart", async (req, res) => {
  const query =
    "SELECT fallnummer, abteilung, station, zimmer, geplantes_entlassdatum, aktuelle_verweildauer, objektid FROM senstower.patient";

  try {
    let result = await dbFunctions.queryDatabase(query);
    const response = { patients: result };
    res.json(response);
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
