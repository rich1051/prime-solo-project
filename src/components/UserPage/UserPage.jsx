import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import SearchResult from "../SearchResult/SearchResult";
import { useState } from "react";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

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
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        <LogOutButton className="btn" />
      </div>
      <form onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Search for movies here!"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <input type="submit" value="SUBMIT" />
        <div>You searched for: {lastSearch} </div>
        <SearchResult />
      </form>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
