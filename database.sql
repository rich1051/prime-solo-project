
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(80) UNIQUE NOT NULL,
    "password" VARCHAR(1000) NOT NULL
);

CREATE TABLE "favorite_recipe" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user" ("id"),
    "recipe_id" INT REFERENCES "recipe" ("id")
);

CREATE TABLE "movie" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255),
    "plot" TEXT,
    "rating" VARCHAR(10),
    "director" VARCHAR(255),
    "actors" VARCHAR(255)
);

CREATE TABLE "recipe" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "author" VARCHAR(80) NOT NULL,
    "backstory" TEXT,
    "ingredients" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "movie_id" INT REFERENCES "movie" ("id"),
    "user_id" INT REFERENCES "user" ("id")
);