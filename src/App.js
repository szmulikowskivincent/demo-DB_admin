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
import Footer from "./components/Footer";
import LoginFormsComponent from "./components/LoginFormsComponent";
import Dashboard_dataComponent from "./components/Dashboard_DataComponent";
import ContactFormsComponent from "./components/ContactFormsComponent";
import HomePageComponent from "./components/HomePageComponent";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePageComponent />} />
            <Route path="/login" element={<LoginFormsComponent />} />
            <Route path="/register" element={<CreateUtilisateur />} />
            <Route
              path="/dashboard_data"
              element={<Dashboard_dataComponent />}
            />
            <Route path="/contact" element={<ContactFormsComponent />} />
          </Routes>
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
        <Link to="/contact">Contact</Link>
        <Link to="/register">Register</Link>
        <button onClick={handleLoginClick}>Login</button>
      </nav>
    </header>
  );
};

export default App;
