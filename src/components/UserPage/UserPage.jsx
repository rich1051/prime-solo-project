import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchResult from "../SearchResult/SearchResult";
import { useState } from "react";

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
        <h2>We're glad you're here, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        <h3>Search for a movie and get started!</h3>
      </div>
      <form onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Search for movies here!"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <input type="submit" value="SUBMIT" />
        {lastSearch === "" ? (
          <div>You haven't searched for anything yet!</div>
        ) : (
          <div>You searched for: {lastSearch}</div>
        )}
        <br></br>
        <SearchResult />
      </form>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
