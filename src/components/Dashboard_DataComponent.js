import React from "react";
import "../css/Dashboard_Data.css";
import UserTable from "./UserTable";
import ContactListComponent from "./ContactListComponent";
import avatar from "../assets/avatar1.png";

const Dashboard_dataComponent = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <br />
        <img src={avatar} alt="Avatar" className="dashboard-avatar" />
        <div>
          <h2>Connexion données utilisateurs</h2>
          <p align="center">🟢 Vous êtes connecté!</p>
        </div>
      </div>
      <UserTable />
      <ContactListComponent />
    </div>
  );
};

export default Dashboard_dataComponent;
