import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactListComponent = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/contacts/")
      .then((response) => {
        setContacts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Erreur lors du chargement des contacts.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement des contacts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Liste des contacts</h2>
      <table>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom de famille</th>
            <th>Email</th>
            <th>Adresse</th>
            <th>Numéro de rue</th>
            <th>Localité</th>
            <th>Sujet</th>
            <th>Genre</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>{contact.address}</td>
              <td>{contact.streetNumber}</td>
              <td>{contact.locality}</td>
              <td>{contact.subject}</td>
              <td>{contact.gender}</td>
              <td>{contact.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactListComponent;
