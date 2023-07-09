import React from "react";
import "./InfoPage.css";

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="info-container">
      <p>This application was made possible using the following tools:</p>
      <li>Node.js</li>
      <li>Express</li>
      <li>React.js</li>
      <li>Redux.js</li>
      <li>PostgreSQL</li>
      <li>Heroku</li>
      <li>Passport</li>
      <li>Material UI</li>
      <li>The OMDb API</li>
      <br></br>
      <p>
        A special thank you to all that have contributed to the success of this
        application before, during, and after its development!
      </p>
    </div>
  );
}

export default InfoPage;
