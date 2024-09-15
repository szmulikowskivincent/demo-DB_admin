import React, { useState } from "react";
import "../css/LoginForm.css";
import { loginAdmin } from "../services/AdminService.js";
import bcrypt from "bcryptjs";
import { ToastContainer, toast } from "react-toastify";
import securityAlertGif from "../assets/logo_Alerte.gif";
import { useNavigate } from "react-router-dom";

const LoginFormComponent = () => {
  const [email, setEmail] = useState("vszmulikowski@gmail.com");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [intrusionAlert, setIntrusionAlert] = useState(false);
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValid(value.length >= 6);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loginAttempts >= 3) {
      setIntrusionAlert(true);
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
      await loginAdmin(email, password);
      setMessage("Connexion réussie");
      setLoginAttempts(0);
      setIntrusionAlert(false);

      navigate("/dashboard_data");
      alert("Vous êtes connecté à votre base de données");
    } catch (error) {
      setMessage("Identifiants incorrects");
      setLoginAttempts((prevAttempts) => prevAttempts + 1);
      if (loginAttempts + 1 >= 3) {
        setIntrusionAlert(true);
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="email"
            minLength={6}
            maxLength={25}
            required
            className={
              emailValid === null ? "" : emailValid ? "valid" : "invalid"
            }
          />
          {emailValid === false && (
            <p className="error-message">Email invalide</p>
          )}
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="password"
            required
            className={
              passwordValid === null ? "" : passwordValid ? "valid" : "invalid"
            }
          />
          {passwordValid === false && (
            <p className="error-message">Mot de passe trop court</p>
          )}
        </div>
        <br />
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>

      {intrusionAlert && (
        <div className="intrusion-alert">
          <img
            src={securityAlertGif}
            alt="Security Alert"
            className="security-logo"
          />
          <h3>⚠️ Alerte intrusion système</h3>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default LoginFormComponent;
