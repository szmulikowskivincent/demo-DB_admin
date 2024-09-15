import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bcrypt from "bcryptjs";
import "../css/UserTable.css";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/utilisateurs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        setError(error.message);
        toast.error("Erreur lors de la récupération des utilisateurs.");
      });
  }, []);

  const handleDelete = async (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/utilisateurs/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setUsers(users.filter((user) => user.id !== id));
          toast.success("Utilisateur supprimé avec succès.");
        } else {
          toast.error("Erreur lors de la suppression.");
        }
      } catch (error) {
        toast.error("Erreur de connexion avec le serveur.");
      }
    }
  };

  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setEmail(user.email);
    setNom(user.nom);
    setPrenom(user.prenom);
    setPassword("");
    setRole(user.role);
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;

    try {
      let hashedPassword = password;

      // Hash the password if it's not empty
      if (password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
      }

      const response = await fetch(
        `http://localhost:8080/api/utilisateurs/${selectedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            nom,
            prenom,
            motDePasse: hashedPassword || selectedUser.motDePasse,
            role,
          }),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(
          users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        toast.success("Utilisateur mis à jour avec succès.");
        setSelectedUser(null);
      } else {
        toast.error("Erreur lors de la mise à jour.");
      }
    } catch (error) {
      toast.error("Erreur de connexion avec le serveur.");
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table
        style={{
          margin: "50px auto",
          width: "80%",
          borderCollapse: "collapse",
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: "8px 10px",
                backgroundColor: "#f0f0f0",
                textAlign: "center",
                border: "1px solid #ddd",
                fontSize: "14px",
              }}
            >
              ID
            </th>
            <th
              style={{
                padding: "8px 10px",
                backgroundColor: "#f0f0f0",
                textAlign: "center",
                border: "1px solid #ddd",
                fontSize: "14px",
              }}
            >
              Email
            </th>
            <th
              style={{
                padding: "8px 10px",
                backgroundColor: "#f0f0f0",
                textAlign: "center",
                border: "1px solid #ddd",
                fontSize: "14px",
              }}
            >
              Nom
            </th>
            <th
              style={{
                padding: "8px 10px",
                backgroundColor: "#f0f0f0",
                textAlign: "center",
                border: "1px solid #ddd",
                fontSize: "14px",
              }}
            >
              Prénom
            </th>
            <th
              style={{
                padding: "8px 10px",
                backgroundColor: "#f0f0f0",
                textAlign: "center",
                border: "1px solid #ddd",
                fontSize: "14px",
              }}
            >
              Rôle
            </th>
            <th
              style={{
                padding: "8px 10px",
                backgroundColor: "#f0f0f0",
                textAlign: "center",
                border: "1px solid #ddd",
                fontSize: "14px",
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              style={{
                backgroundColor: "#f9f9f9",
                padding: "8px 10px",
                textAlign: "center",
                border: "1px solid #ddd",
                fontSize: "12px",
              }}
            >
              <td
                style={{
                  padding: "8px 10px",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                {user.id}
              </td>
              <td
                style={{
                  padding: "8px 10px",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                {user.email}
              </td>
              <td
                style={{
                  padding: "8px 10px",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                {user.nom}
              </td>
              <td
                style={{
                  padding: "8px 10px",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                {user.prenom}
              </td>
              <td
                style={{
                  padding: "8px 10px",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                {user.role}
              </td>
              <td
                style={{
                  padding: "8px 10px",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                <button
                  style={{
                    width: "105px",
                    height: "35px",
                    fontSize: "12px",
                    margin: "0 5px",
                    border: "none",
                    backgroundColor: "#4caf50",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => openUpdateModal(user)}
                >
                  Modifier
                </button>
                <button
                  style={{
                    width: "105px",
                    height: "35px",
                    fontSize: "12px",
                    margin: "0 5px",
                    border: "none",
                    backgroundColor: "red",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(user.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedUser(null)}>
              &times;
            </span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mot de passe (laisser vide pour ne pas changer)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
            <input
              type="text"
              placeholder="Prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />

            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="ADMIN">Admin</option>
              <option value="UTILISATEUR">Utilisateur</option>
              <option value="INVITE">Invité</option>
            </select>

            <button onClick={handleUpdate}>Mettre à jour</button>
            <button
              onClick={() => setSelectedUser(null)}
              style={{ backgroundColor: "red" }}
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default UserTable;
