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

// get existing recipes (movie-specific) from db:
router.get("/:imdbId", (req, res) => {
  const queryText = 'SELECT * FROM "recipe" WHERE "imdb_id" = $1';
  const values = [req.params.movieId];
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
  const { title, author, backstory, ingredients, instructions } = req.body;
  const queryText = `INSERT INTO "recipe" ("title", "author", "backstory", "ingredients", "instructions") VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  pool
    .query(queryText, [title, author, backstory, ingredients, instructions])
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
  const { favorite } = req.body;
  const queryText = `UPDATE "recipe" SET "title" = $1, "author" = $2, "backstory" = $3, "ingredients" = $4, "instructions" = $5 WHERE "id" = $6 RETURNING *`;
  const queryValues = [
    title,
    author,
    backstory,
    ingredients,
    instructions
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

  // First, alter the foreign key constraint to include cascading deletions
  const alterConstraintQuery =
    'ALTER TABLE "favorite_recipe" DROP CONSTRAINT IF EXISTS favorite_recipe_recipe_id_fkey, ADD CONSTRAINT favorite_recipe_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES "recipe" (id) ON DELETE CASCADE';

  // Then, delete the recipe from the "recipe" table
  const deleteRecipeQuery = 'DELETE FROM "recipe" WHERE "id" = $1';
  const queryValue = [recipeId];

  pool
    .query(alterConstraintQuery)
    .then(() => {
      return pool.query(deleteRecipeQuery, queryValue);
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("Error deleting recipe:", error);
      res.sendStatus(500);
    });
});

module.exports = router;
