import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MovieList from "../MovieList/MovieList";
import { useState } from "react";
import "./UserPage.css";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const movieListReducer = useSelector((store) => store.movieListReducer);

  const dispatch = useDispatch();

  let [search, setSearch] = useState("");

  const [lastSearch, setLastSearch] = useState("");

  const searchMovies = (event) => {
    event.preventDefault();
    console.log("Search input is:", search);
    dispatch({ type: "GET_MOVIE", payload: search });
    setLastSearch(search);
    setSearch("");
  };

  return (
    <>
      <div className="container">
        {/* <p className="id-banner">Your ID is: {user.id}</p> */}
        <h2 className="welcome-banner">
          We're glad you're here, {user.username}!
        </h2>
        <h3 className="subwelcome-banner">
          Search for a movie and get started!
        </h3>
      </div>
      <form className="search-form" onSubmit={searchMovies}>
        <input
          className="search-bar"
          type="text"
          placeholder="Search for movies here!"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <input className="submit-btn" type="submit" value="SUBMIT" />
        {lastSearch === "" ? (
          <div className="search-result">
            You haven't searched for anything yet!
          </div>
        ) : (
          <div className="search-result">You searched for: {lastSearch}</div>
        )}
        <br></br>
        <MovieList />
      </form>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
