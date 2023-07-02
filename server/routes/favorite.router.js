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
  const queryText = `SELECT * FROM "recipe" 
    JOIN "favorite_recipe" ON "recipe"."id" = "favorite_recipe"."recipe_id"
    WHERE "favorite_recipe"."user_id" = $1`;
  pool
    .query(queryText, values)
    .then((result) => {
      console.log(result.rows)
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error retrieving favorites:", error);
      res.sendStatus(500);
    });
});

module.exports = router;
