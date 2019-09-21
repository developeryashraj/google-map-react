const express = require("express");
var db = require("./db/db");
// Set up the express app
const app = express();

// get all locations
app.get("/api/v1/locations", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send({
    success: "true",
    message: "Locations retrieved successfully",
    locations: db.locations,
    initialMapSettings: db.initialMapSettings
  });
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
