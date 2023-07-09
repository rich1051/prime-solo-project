const express = require("express");
const pool = require("../modules/pool");
require("dotenv").config();
const axios = require("axios");
const { Pool } = require("pg");
const router = express.Router();

// get all existing recipes from db (not used but could be later):
router.get("/", (req, res) => {
  const queryText = 'SELECT * FROM "recipe"';
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error retrieving recipes:", error);
      res.sendStatus(500);
    });
});

// get all personal recipes from db:
router.get("/personal/:username", (req, res) => {
  const queryText = 'SELECT * FROM "recipe" WHERE "author" = $1';
  const values = [req.params.username];
  pool
    .query(queryText, values)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error retrieving recipes:", error);
      res.sendStatus(500);
    });
});

// get existing recipes (movie-specific) from db:
router.get("/movie/:imdbID", (req, res) => {
  const queryText = 'SELECT * FROM "recipe" WHERE "imdb_id" = $1';
  const values = [req.params.imdbID];
  pool
    .query(queryText, values)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error retrieving recipes:", error);
      res.sendStatus(500);
    });
});

// post new recipe to db:
router.post("/", (req, res) => {
  console.log("POST RECEIVED LETS GOOOOOOOOOO");
  const { title, author, backstory, ingredients, instructions, imdbID } =
    req.body;
  const queryText = `INSERT INTO "recipe" ("title", "author", "backstory", "ingredients", "instructions", "imdb_id") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  pool
    .query(queryText, [
      title,
      author,
      backstory,
      ingredients,
      instructions,
      imdbID,
    ])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log("Error adding recipe:", error);
      res.sendStatus(500);
    });
});

// edit existing recipe in db:
router.put("/:id/edit", (req, res) => {
  const recipeId = req.params.id;
  console.log("REQ.PARAMS.ID IS:", req.params.id);
  const { title, author, backstory, ingredients, instructions } = req.body;
  console.log("REQ.BODY IS:", req.body);
  const queryText = `UPDATE "recipe" SET "title" = $1, "author" = $2, "backstory" = $3, "ingredients" = $4, "instructions" = $5 WHERE "id" = $6 RETURNING *`;
  const queryValues = [
    title,
    author,
    backstory,
    ingredients,
    instructions,
    recipeId,
  ];

  pool
    .query(queryText, queryValues)
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log("Error updating recipe:", error);
      res.sendStatus(500);
    });
});

// delete existing recipe from db:
router.delete("/:id", (req, res) => {
  const recipeId = req.params.id;

  // Then, delete the recipe from the "recipe" table
  const deleteRecipeQuery = 'DELETE FROM "recipe" WHERE "id" = $1';
  const queryValue = [recipeId];

  pool
    .query(deleteRecipeQuery, queryValue)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("Error deleting recipe:", error);
      res.sendStatus(500);
    });
});

module.exports = router;
