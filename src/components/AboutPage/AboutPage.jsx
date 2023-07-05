import React from "react";
import "./AboutPage.css"

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p className="about-description">
          Have you ever hosted a movie night/party but dropped the ball on the
          audience experience? Well, look no further. The Reel Recipes app
          allows users to seamlessly pair their film-viewing experiences with
          unprecedented food and beverage combinations recommended and designed
          by other users. Simply select the movie of interest and select from a
          variety of user-submitted recipes that will bring your gathering to
          the next level. Save your favorites or even create your own to share
          with the community. Who knows? Your personal creation could be the
          next cinema sensation.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
