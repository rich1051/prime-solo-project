const express = require("express");
const pool = require("../modules/pool");
require("dotenv").config();
const axios = require("axios");
const { Pool } = require("pg");
const router = express.Router();

router.get(`/:search`, (req, res) => {
	console.log("req.params.search is:", req.params.search);
	const searchInput = req.params.search;
	axios
		.get(
            `http://img.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${searchInput}`
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