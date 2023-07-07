-- Create a database called "reel_recipes"

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username character varying(80) NOT NULL UNIQUE,
    password character varying(1000) NOT NULL
);

CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    title character varying(255) NOT NULL,
    author character varying(80) NOT NULL,
    backstory text,
    ingredients text NOT NULL,
    instructions text NOT NULL,
    imdb_id character varying(80),
    user_id integer REFERENCES "user"(id)
);

CREATE TABLE favorite_recipe (
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES "user"(id),
    recipe_id integer REFERENCES recipe(id) ON DELETE CASCADE
);