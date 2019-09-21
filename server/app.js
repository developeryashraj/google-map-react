const express = require("express");
const https = require("https");
const urlencode = require("urlencode");
const bodyParser = require("body-parser");

var db = require("./db/db");
// Set up the express app
const app = express();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
app.use(express.json());
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// get all locations
app.get("/api/v1/locations", (req, res) => {
  res.status(200).send({
    success: "true",
    message: "Locations retrieved successfully",
    locations: db.locations,
    initialMapSettings: db.initialMapSettings
  });
});

app.post("/api/v1/add", (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({
      success: "false",
      message: "Address / Place name is required"
    });
  }
  // const apiURL = geoCodeAPIURL(req.body.title);

  let resSample = db.sampleResponse;
  if (resSample.status === "OK") {
    const location = {
      id: db.locations.length + 1,
      name: req.body.title,
      position: resSample.results[0].geometry.location
    };
    db.locations.push(location);
    return res.status(201).send({
      success: "true",
      message: "Location added successfully",
      locations: db.locations
    });
  } else if (resSample.status === "ZERO_RESULTS") {
    return res.status(400).send({
      success: "false",
      message: "No result found. Please enter Germany address only."
    });
  } else {
    return res.status(400).send({
      success: "false",
      message: "Invalid Request"
    });
  }
});

app.delete("/api/v1/delete/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  let isRemoved = false;
  db.locations.map((location, index) => {
    if (location.id === id) {
      db.locations.splice(index, 1);
      isRemoved = true;
    }
  });

  if (isRemoved) {
    return res.status(200).send({
      success: "true",
      message: "Location deleted successfuly",
      locations: db.locations
    });
  } else {
    return res.status(404).send({
      success: "false",
      message: "Location not found"
    });
  }
});

// app.get("/test", (req, res) => {
//   test();
// });

// function test() {
//   const address = "Vabali Spa, Berlin";
//   const apiURL = geoCodeAPIURL(address);

//   console.log(apiURL, "=================");
//   https
//     .get(apiURL, resp => {
//       let data = "";

//       // The whole response has been received. Print out the result.
//       resp.on("end", () => {
//         console.log(JSON.parse(data).explanation);
//       });
//     })
//     .on("error", err => {
//       console.log("Error: " + err.message);
//     });
// }

function geoCodeAPIURL(address = "") {
  const encodeAddress = urlencode(address);
  return (
    db.settings.apiURL +
    "geocode/json?address=" +
    encodeAddress +
    "&key=" +
    db.settings.apiKey +
    "&region=" +
    db.settings.region
  );
}
