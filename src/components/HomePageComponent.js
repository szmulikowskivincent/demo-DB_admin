import React from "react";
import "../css/HomePage.css";
import logo from "../assets/logo.svg";

const HomePage = () => {
  return (
    <div className="home-container">
      <img src={logo} alt="Logo" className="home-logo" />
      <h2>Bienvenue sur notre site !</h2>
    </div>
  );
};

export default HomePage;
