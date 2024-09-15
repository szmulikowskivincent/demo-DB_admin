import React from "react";
import "../css/Dashboard_Data.css";
import UserTable from "./UserTable";

const Dashboard_dataComponent = () => {
  return (
    <div>
      <h2>Connexion données utilisateurs</h2>
      <UserTable />
    </div>
  );
};

export default Dashboard_dataComponent;
