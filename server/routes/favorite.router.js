const express = require("express");
const pool = require("../modules/pool");
require("dotenv").config();
const axios = require("axios");
const { Pool } = require("pg");
const router = express.Router();

// get favorites from db:
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  const values = [userId];
  const queryText = `SELECT recipe.* FROM "recipe" 
    JOIN "favorite_recipe" ON "recipe"."id" = "favorite_recipe"."recipe_id"
    WHERE "favorite_recipe"."user_id" = $1`;
  pool
    .query(queryText, values)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error retrieving favorites:", error);
      res.sendStatus(500);
    });
});

// favorite or unfavorite a recipe in db:
router.post("/:id/favorite", (req, res) => {
  const recipeId = req.params.id;
  const userId = req.body.userId;
  const postQuery = `INSERT INTO "favorite_recipe" ("user_id", "recipe_id") VALUES ($1, $2)`;
  const values = [userId, recipeId];
  pool
    .query(postQuery, values)
    .then((response) => {
      console.log("FAVORITE POST SUCCESS", response);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Issue with the FAVORITE POST", err);
      res.sendStatus(500);
    });
});

router.post("/:id/unfavorite", (req, res) => {
  const recipeId = req.params.id;
  const userId = req.body.userId;
  console.log("RECIPEID is", recipeId);
  console.log("USERID is", userId);
  const postQuery = `DELETE FROM "favorite_recipe" WHERE "user_id" = $1 AND "recipe_id" = $2`;
  const values = [userId, recipeId];
  pool
    .query(postQuery, values)
    .then((response) => {
      console.log("UNFAVORITE DELETE SUCCESS", response);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Issue with the UNFAVORITE DELETE", err);
      res.sendStatus(500);
    });
});

module.exports = router;
