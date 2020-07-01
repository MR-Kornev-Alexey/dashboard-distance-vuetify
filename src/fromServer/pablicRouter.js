const express = require("express");
const cfg = require("./lib/config");
const db = require("./connect_db");
const s3 = require("./lib/s3_dao");
const isE = require("./lib/isEmpty");
const parser = require("ua-parser-js");
let moment = require("moment");
const registr = require("./lib/user_router");
var bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }).any();

publicRouter.post("/sortingcity", bodyParser.json(), async function(req, res) {
  const data = req.body;
  const result = await db.getSortingCity(data);
  res.type("application/json");
  if (isE.isEmpty(result)) {
    res.status(404);
    res.send(JSON.stringify({ status: "not found" }));
  } else {
    res.send(JSON.stringify(result));
  }
});

publicRouter.post("/sortindistance", bodyParser.json(), async function(
  req,
  res
) {
  const data = req.body;
  const result = await db.getSortingDistance(data);
  res.type("application/json");
  if (isE.isEmpty(result)) {
    res.status(404);
    res.send(JSON.stringify({ status: "not found" }));
  } else {
    res.send(JSON.stringify(result));
  }
});

publicRouter.post("/sortingnumber", bodyParser.json(), async function(
  req,
  res
) {
  const data = req.body;
  const result = await db.getSortingNumber(data);
  res.type("application/json");
  if (isE.isEmpty(result)) {
    res.status(404);
    res.send(JSON.stringify({ status: "not found" }));
  } else {
    res.send(JSON.stringify(result));
  }
});

publicRouter.post("/getfaker", bodyParser.json(), async function(req, res) {
  const pageNumber = (req.body.pageNumber - 1) * req.body.distPerPage;
  const distPerPage = req.body.distPerPage;
  const result = await db.getAllDist(distPerPage, pageNumber);
  res.type("application/json");
  if (isE.isEmpty(result)) {
    res.status(404);
    res.send(JSON.stringify({ status: "not found" }));
  } else {
    res.send(JSON.stringify(result));
  }
});
