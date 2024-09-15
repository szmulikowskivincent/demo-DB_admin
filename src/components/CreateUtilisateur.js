import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/CreateUtilisateur.css";

function CreateUtilisateur() {
  const initialFormData = {
    email: "",
    password: "",
    confirmPassword: "",
    nom: "",
    prenom: "",
    role: "UTILISATEUR",
  };

  const initialValidity = {
    email: true,
    password: true,
    confirmPassword: true,
    nom: true,
    prenom: true,
    role: true,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [validity, setValidity] = useState(initialValidity);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setValidity((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return value.includes("@");
      case "password":
        return value.length >= 6;
      case "confirmPassword":
        return value === formData.password;
      case "nom":
      case "prenom":
        return value.trim() !== "";
      default:
        return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.values(validity).every(Boolean)) {
      toast.error("Veuillez corriger les erreurs dans le formulaire.");
      return;
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(formData.password, salt);

      const response = await fetch("http://localhost:8080/api/utilisateurs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          motDePasse: hashedPassword,
          nom: formData.nom,
          prenom: formData.prenom,
          role: formData.role,
        }),
      });

      if (response.ok) {
        toast.success("Utilisateur enregistré avec succès.");
        handleReset();
      } else {
        toast.error("Erreur lors de l'enregistrement.");
      }
    } catch (error) {
      toast.error("Erreur de connexion avec le serveur.");
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setValidity(initialValidity);
  };

  return (
    <div className="CreateUtilisateur-container">
      <h2>Create Utilisateur</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{ borderColor: validity.email ? "green" : "red" }}
          minLength={6}
          maxLength={40}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          style={{ borderColor: validity.password ? "green" : "red" }}
          minLength={6}
          maxLength={25}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmer le mot de passe"
          value={formData.confirmPassword}
          onChange={handleChange}
          style={{ borderColor: validity.confirmPassword ? "green" : "red" }}
          minLength={6}
          maxLength={25}
          required
        />
        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={formData.nom}
          onChange={handleChange}
          style={{ borderColor: validity.nom ? "green" : "red" }}
          minLength={6}
          maxLength={25}
          required
        />
        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          value={formData.prenom}
          onChange={handleChange}
          style={{ borderColor: validity.prenom ? "green" : "red" }}
          minLength={6}
          maxLength={25}
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="ADMIN">Admin</option>
          <option value="UTILISATEUR">Utilisateur</option>
          <option value="INVITE">Invité</option>
        </select>

        <button type="submit">S'inscrire</button>
        <button
          type="button"
          onClick={handleReset}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Réinitialiser
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CreateUtilisateur;
