const express = require("express");
const pool = require("../modules/pool");
require("dotenv").config();
const axios = require("axios");
const { Pool } = require("pg");
const router = express.Router();

// post new recipe:
router.post('/', (req, res) => {
  console.log("POST RECEIVED LETS GOOOOOOOOOO");
    const { title, author, backstory, ingredients, instructions } = req.body;
    const queryText = `INSERT INTO "recipe" ("title", "author", "backstory", "ingredients", "instructions") VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    pool.query(queryText, [title, author, backstory, ingredients, instructions])
      .then((result) => {
        res.send(result.rows[0]);
      })
      .catch((error) => {
        console.log('Error adding recipe:', error);
        res.sendStatus(500);
      });
  });

// edit existing recipe:
  router.put('/:id', (req, res) => {
    const recipeId = req.params.id;
    const { title, author, backstory, ingredients, instructions } = req.body;
    const queryText = 'UPDATE "recipe" SET "title" = $1, "author" = $2, "backstory" = $3, "ingredients" = $4, "instructions" = $5 WHERE "id" = $6 RETURNING *';
    const queryValues = [title, author, backstory, ingredients, instructions, recipeId];
  
    pool.query(queryText, queryValues)
      .then((result) => {
        res.send(result.rows[0]);
      })
      .catch((error) => {
        console.log('Error updating recipe:', error);
        res.sendStatus(500);
      });
  });

// delete existing recipe:
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