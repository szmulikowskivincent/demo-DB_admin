package com.example.demo.forms;

import com.example.demo.domain.entities.Utilisateur;
import com.example.demo.domain.entities.enums.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateUtilisateurForms {

    @NotBlank(message = "L'adresse e-mail ne peut pas être vide")
    @Email(message = "L'adresse e-mail doit être valide")
    private String email;

    @NotBlank(message = "Le mot de passe ne peut pas être vide")
    @Size(min = 6, max = 255, message = "Le mot de passe doit contenir entre 6 et 255 caractères")
    private String password;

    @NotBlank(message = "La confirmation du mot de passe ne peut pas être vide")
    @Size(min = 6, max = 255, message = "La confirmation du mot de passe doit contenir entre 6 et 255 caractères")
    private String confirmPassword;

    @NotBlank(message = "Le prénom ne peut pas être vide")
    private String prenom;

    @NotBlank(message = "Le nom ne peut pas être vide")
    private String nom;

    @NotBlank(message = "Le rôle ne peut pas être vide")
    private String role;

    public Utilisateur toEntity() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail(this.email);
        utilisateur.setMotDePasse(this.password);
        utilisateur.setPrenom(this.prenom);
        utilisateur.setNom(this.nom);

        utilisateur.setRole(Role.valueOf(this.role.toUpperCase()));

        return utilisateur;
    }

    public boolean isPasswordConfirmed() {
        return this.password.equals(this.confirmPassword);
    }
}

