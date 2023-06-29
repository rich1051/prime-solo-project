const express = require("express");
const pool = require("../modules/pool");
require("dotenv").config();
const axios = require("axios");
const { Pool } = require("pg");
const router = express.Router();

// get existing recipes from db:
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
  const queryText =
    'UPDATE "recipe" SET "title" = $1, "author" = $2, "backstory" = $3, "ingredients" = $4, "instructions" = $5 WHERE "id" = $6 RETURNING *';
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

// favorite or unfavorite a recipe in db:
router.put("/:id/favorite", (req, res) => {
  const recipeId = req.params.id;
  const putQuery = `UPDATE "recipe" SET "favorite" = CASE 
    WHEN "favorite" = TRUE THEN FALSE 
    ELSE TRUE END WHERE "id" = $1`;
  const values = [recipeId];
  pool
    .query(putQuery, values)
    .then((response) => {
      console.log("PUT SUCCESS", response);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Issue with the PUT", err);
      res.sendStatus(500);
    });
});

// delete existing recipe from db:
router.delete("/:id", (req, res) => {
  const recipeId = req.params.id;
  const queryText = 'DELETE FROM "recipe" WHERE "id" = $1';
  const queryValue = [recipeId];

  pool
    .query(queryText, queryValue)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("Error deleting recipe:", error);
      res.sendStatus(500);
    });
});

module.exports = router;
