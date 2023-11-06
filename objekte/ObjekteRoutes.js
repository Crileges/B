const express = require("express");
const dbFunctions = require("../database/dbFunctions");

const router = express.Router();

router.get("/objekte", async (req, res) => {
  try {
    let query = "SELECT * FROM senstower.objekte";
    let result = await dbFunctions.queryDatabase(query); // Await the query execution
    const response = { objects: result };
    res.json(response);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

module.exports = router;
