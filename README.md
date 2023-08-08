
# Prime Solo Project: Reel Recipes

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Description

Duration: 2 Week Sprint

With a nearly endless collection of movies at our disposal, it can be hard to easily track current and past films that we want to watch. However, not anymore. Introducing the Weekend Movie Sagas app! This is a fully-functioning full-stack app primarily utilizing the power of React.js, Redux.js, and SQL to guide a user through a movie collection with a brief description for each, making it easier than ever to identify the perfect movie for your next watch party. 

## Installation

1. Create a database named `reel_recipes`
2. Run the queries from `database.sql` on the `reel_recipes` database
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage

1. The app opens on a "Login" page. Click the Register button to create a new user.  

2. The application will navigate to the "Home" page, which provides a search bar that taps into the OMDb API movie database. Clicking a movie card will take the user to the selected movie's "Details" page.

3. The "Details" page provides movie-specific details, including cast, rating, and a plot summary. The user can also click the "Add" button, which initiates a modal form to create a recipe themed around the movie.

4. Below the movie details is a list (if present) of recipes created by users. The current user can view other users' recipes and "Favorite" them, adding them to the "My Favorites" tab. If the current user has already created a recipe for the movie, they are able to "Edit" and "Delete" their own recipes from the list.

5. Navigating to the "My Recipes" tab using the Navigation Bar will display all recipes created by the current user across all movies. The user can "View", "Delete", and "Edit" their recipes from this page. Navigating to the "My Favorites" tab will display all recipes favorited by the current user across all movies. The user can "View" and "Remove" (Unfavorite) their favorited recipes from this page.

## Built With

Visual Studio Code, Node/Nodemon, React.js, Redux.js, Passport.js, Axios, OMDb API, Material-UI, SQL, and Express

## Acknowledgement

Thanks to the Prime Digital Academy faculty (Liz and Dane) who equipped me with the tools to make this application possible. 

## Support

If you have suggestions or issues, please email me at rich1051@umn.edu
