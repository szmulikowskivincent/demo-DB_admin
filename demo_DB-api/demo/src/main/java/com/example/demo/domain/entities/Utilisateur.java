package com.example.demo.domain.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import com.example.demo.domain.entities.enums.Role;

import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "utilisateurs")
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String motDePasse;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    public Utilisateur() {
    }

    public Utilisateur(String email, String motDePasse, String nom, String prenom, Role role) {
        this.email = email;
        this.motDePasse = motDePasse;
        this.nom = nom;
        this.prenom = prenom;
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if ( this == o ) return true;
        if ( o == null || getClass() != o.getClass() ) return false;
        Utilisateur that = (Utilisateur) o;
        return Objects.equals(id, that.id) && Objects.equals(email, that.email) && Objects.equals(nom, that.nom) && Objects.equals(prenom, that.prenom) && role == that.role;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email, nom, prenom, role);
    }
}

