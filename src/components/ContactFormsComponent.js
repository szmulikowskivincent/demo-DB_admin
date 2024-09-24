import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/ContactForms.css";

const ContactFormsComponent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    streetNumber: "",
    locality: "",
    subject: "",
    gender: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName)
      newErrors.firstName = "Le prénom ne peut pas être vide";
    if (!formData.lastName)
      newErrors.lastName = "Le nom de famille ne peut pas être vide";
    if (!formData.email)
      newErrors.email = "L'adresse e-mail ne peut pas être vide";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "L'adresse e-mail doit être valide";
    if (!formData.address)
      newErrors.address = "L'adresse ne peut pas être vide";
    if (!formData.streetNumber)
      newErrors.streetNumber = "Le numéro de rue ne peut pas être vide";
    if (!formData.locality)
      newErrors.locality = "La localité ne peut pas être vide";
    if (!formData.subject) newErrors.subject = "Le sujet ne peut pas être vide";
    if (!formData.gender) newErrors.gender = "Le genre ne peut pas être vide";
    if (!formData.message)
      newErrors.message = "Le message ne peut pas être vide";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/contacts",
          formData
        );
        console.log("Réponse:", response.data);
        toast.success("Votre message a été envoyé avec succès !");
        setSuccessMessage("Votre message a été envoyé avec succès !");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          address: "",
          streetNumber: "",
          locality: "",
          subject: "",
          gender: "",
          message: "",
        });
        setErrors({});
      } catch (error) {
        console.error(
          "Erreur lors de l'envoi du message:",
          error.response || error.message
        );
        toast.error("Erreur lors de l'envoi du message");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <br />
      <form onSubmit={handleSubmit}>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

        <div>
          <label></label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? "invalid" : "valid"}
            placeholder="Prénom:"
            minLength={5}
            maxLength={25}
          />
          {errors.firstName && (
            <p className="error-message">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label></label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? "invalid" : "valid"}
            placeholder="Nom de famille:"
            minLength={5}
            maxLength={25}
          />
          {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        </div>

        <div>
          <label></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "invalid" : "valid"}
            placeholder="Email:"
            minLength={10}
            maxLength={50}
            pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div>
          <label></label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? "invalid" : "valid"}
            placeholder="Adresse:"
            minLength={10}
            maxLength={25}
          />
          {errors.address && <p className="error-message">{errors.address}</p>}
        </div>

        <div>
          <label></label>
          <input
            type="text"
            name="streetNumber"
            value={formData.streetNumber}
            onChange={handleChange}
            className={errors.streetNumber ? "invalid" : "valid"}
            placeholder="Numéro de rue:"
            minLength={10}
            maxLength={25}
          />
          {errors.streetNumber && (
            <p className="error-message">{errors.streetNumber}</p>
          )}
        </div>

        <div>
          <label></label>
          <input
            type="text"
            name="locality"
            value={formData.locality}
            onChange={handleChange}
            className={errors.locality ? "invalid" : "valid"}
            placeholder="Localité:"
            minLength={5}
            maxLength={25}
          />
          {errors.locality && <p className="error-message">{errors.locality}</p>}
        </div>

        <div>
          <label></label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={errors.subject ? "invalid" : "valid"}
            placeholder="Sujet:"
            minLength={5}
            maxLength={25}
          />
          {errors.subject && <p className="error-message">{errors.subject}</p>}
        </div>

        <div>
          <label></label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={errors.gender ? "invalid" : "valid"}
            placeholder="Genre:"
            minLength={5}
            maxLength={15}
          />
          {errors.gender && <p className="error-message">{errors.gender}</p>}
        </div>

        <div>
          <label></label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? "invalid" : "valid"}
            placeholder="Message:"
            minLength={10}
            maxLength={150}
          />
          {errors.message && <p className="error-message">{errors.message}</p>}
        </div>

        <button type="submit">Soumettre</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ContactFormsComponent;

