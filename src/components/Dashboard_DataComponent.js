import React from "react";
import "../css/Dashboard_Data.css";
import UserTable from "./UserTable";
import ContactListComponent from "./ContactListComponent";

const Dashboard_dataComponent = () => {
  return (
    <div>
      <h2>Connexion données utilisateurs</h2>
      <p align="center">🟢 Vous êtes connecté!</p>
      <UserTable />
      <ContactListComponent />
    </div>
  );
};

export default Dashboard_dataComponent;
