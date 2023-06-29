const express = require("express");
const pool = require("../modules/pool");
require("dotenv").config();
const axios = require("axios");
const { Pool } = require("pg");
const router = express.Router();

// get favorites from db:
router.get("/", (req, res) => {
  const queryText = 'SELECT * FROM "recipe" WHERE "favorite" = TRUE';
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error retrieving favorites:", error);
      res.sendStatus(500);
    });
});

module.exports = router;
