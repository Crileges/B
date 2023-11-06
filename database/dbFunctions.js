// dbFunctions.js

const { Client } = require("pg");

// Datenbankverbindung erstellen
const client = new Client({
  user: "postgres",
  password: "Sens1234!",
  host: "10.10.100.41",
  port: "5432",
  database: "postgres",
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

async function queryDatabase(sqlQuery) {
  try {
    // Execute the query and retrieve the data
    const result = await client.query(sqlQuery);

    return result.rows;
  } catch (error) {
    console.error("Error retrieving data from the database:", error);
    throw error;
  }
}

module.exports = {
  connectToDatabase,
  queryDatabase,
  // Fügen Sie hier Ihre anderen Datenbankfunktionen hinzu
};
