package com.example.demo.api.model.dto;

import com.example.demo.domain.entities.enums.Role;
import lombok.Getter;

@Getter
public class UtilisateurDTO {

    private Long id;
    private String email;
    private String nom;
    private String prenom;
    private Role role;

    public UtilisateurDTO() {
    }

    public UtilisateurDTO(Long id, String email, String nom, String prenom, Role role) {
        this.id = id;
        this.email = email;
        this.nom = nom;
        this.prenom = prenom;
        this.role = role;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}

