const express = require("express");
const pool = require("../modules/pool");
require("dotenv").config();
const axios = require("axios");
const { Pool } = require("pg");
const router = express.Router();

router.post('/add', (req, res) => {
    const { title, author, backstory, ingredients, instructions, movieId, userId } = req.body;
    const queryText = 'INSERT INTO "recipe" ("title", "author", "backstory", "ingredients", "instructions", "movie_id", "user_id") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    pool.query(queryText, [title, author, backstory, ingredients, instructions, movieId, userId])
      .then((result) => {
        res.send(result.rows[0]);
      })
      .catch((error) => {
        console.log('Error adding recipe:', error);
        res.sendStatus(500);
      });
  });

  module.exports = router;