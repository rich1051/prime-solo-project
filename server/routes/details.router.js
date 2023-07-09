const express = require("express");
const pool = require("../modules/pool");
require("dotenv").config();
const axios = require("axios");
const { Pool } = require("pg");
const router = express.Router();

router.get(`/:imdbID`, (req, res) => {
  console.log("req.params.imdbID is:", req.params.imdbID);
  const { imdbID } = req.params;
  axios
    .get(
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${imdbID}&plot=full`
    )
    .then((response) => {
      res.send(response.data);
      // res.sendStatus(200);
    })
    .catch((error) => {
      console.log("error getting on server", error);
      res.sendStatus(500);
    });
});

module.exports = router;
