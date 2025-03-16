import React from "react";
import "./Home.css"; // Import the CSS file

function HomePage() {
  return (
    <div className="home-container">
      <h1 className="title">Smart Ration System</h1>
      <p className="description">
        The{" "}
        <strong>Smart Ration Distribution and Security System (SRDSS)</strong>
        is an innovative solution aimed at addressing key challenges in the
        <strong>Public Distribution System (PDS)</strong>, such as
        <span className="highlight"> ration theft</span> and
        <span className="highlight"> inventory mismanagement</span>.
      </p>

      <div className="features">
        <div className="feature-box">
          <h3>Advanced Technology</h3>
          <p>
            Integrates{" "}
            <strong>RFID, IoT, GPS tracking, and cloud computing</strong>
            for a secure and efficient ration supply chain.
          </p>
        </div>

        <div className="feature-box">
          <h3>Enhanced Security</h3>
          <p>
            Uses <strong>strain gauge sensors</strong> to prevent theft and
            monitor the distribution process effectively.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
