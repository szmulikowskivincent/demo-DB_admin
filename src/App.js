import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import "./css/CreateUtilisateur.css";
import "./css/App.css";
import "./css/UserTable.css";
import logo from "./assets/logo.svg";
import CreateUtilisateur from "./components/CreateUtilisateur";
import UserTable from "./components/UserTable";
import Footer from "./components/Footer";
import LoginFormComponent from "./components/LoginFormComponent";
import Dashboard_dataComponent from "./components/Dashboard_DataComponent";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/login" element={<LoginFormComponent />} />
            <Route
              path="/dashboard_data"
              element={<Dashboard_dataComponent />}
            />
          </Routes>
          <CreateUtilisateur />
          <Footer />
        </main>
      </div>
    </Router>
  );
}

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <header>
      <nav>
        <Link to="/">
          <img src={logo} alt="Logo" className="header-logo" />
        </Link>
        <Link to="/">Home</Link>
        <button onClick={handleLoginClick}>Login</button>
      </nav>
    </header>
  );
};

export default App;
