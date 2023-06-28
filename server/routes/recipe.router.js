const express = require("express");
const pool = require("../modules/pool");
require("dotenv").config();
const axios = require("axios");
const { Pool } = require("pg");
const router = express.Router();

router.post('/recipes', (req, res) => {
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

  router.put('/recipes/:id', (req, res) => {
    const recipeId = req.params.id;
    const { title, author, backstory, ingredients, instructions, movieId, userId } = req.body;
    const queryText = 'UPDATE "recipe" SET "title" = $1, "author" = $2, "backstory" = $3, "ingredients" = $4, "instructions" = $5, "movie_id" = $6, "user_id" = $7 WHERE "id" = $8 RETURNING *';
    const queryValues = [title, author, backstory, ingredients, instructions, movieId, userId, recipeId];
  
    pool.query(queryText, queryValues)
      .then((result) => {
        res.send(result.rows[0]);
      })
      .catch((error) => {
        console.log('Error updating recipe:', error);
        res.sendStatus(500);
      });
  });

  router.delete('/recipes/:id', (req, res) => {
    const recipeId = req.params.id;
    const queryText = 'DELETE FROM "recipe" WHERE "id" = $1';
    const queryValue = [recipeId];
  
    pool.query(queryText, queryValue)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((error) => {
        console.log('Error deleting recipe:', error);
        res.sendStatus(500);
      });
  });

  module.exports = router;