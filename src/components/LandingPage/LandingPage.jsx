import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

function LandingPage() {
  const [heading, setHeading] = useState("Are you ready for your next movie night?");
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <div className="container">
      <h2 className="heading">{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            Reel Recipes is an innovative application designed for movie
            enthusiasts and food lovers alike. This unique platform combines the
            love for cinema and culinary arts by allowing users to create,
            discover, and share recipes inspired by their favorite movies. With
            Reel Recipes, users can embark on a gastronomic journey, exploring a
            wide range of delectable dishes and beverages associated with
            specific films.
          </p>

          <p>
            The application offers a seamless user experience, empowering
            individuals to unleash their creativity in the kitchen while
            connecting with like-minded individuals. Users can create and
            customize their own recipes, complete with detailed ingredient lists
            and step-by-step instructions for other users to follow along. They
            can also add a touch of personal flair by sharing anecdotes or
            trivia about the movie that inspired the dish.
          </p>

          <p>
            Reel Recipes fosters a vibrant community where users can browse and
            favorite recipes shared by others. This enables users to discover
            new culinary delights, engage with other members of the community,
            and even collaborate on creating thematic menus for movie-themed
            gatherings or events. Whether it's recreating the iconic spaghetti
            scene from "Lady and the Tramp" or concocting a magical potion
            inspired by "Harry Potter," Reel Recipes offers an immersive and
            interactive experience that brings together the joys of cooking and
            the magic of the silver screen.
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
