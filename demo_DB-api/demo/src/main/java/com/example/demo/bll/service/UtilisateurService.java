package com.example.demo.bll.service;

import com.example.demo.api.model.dto.UtilisateurDTO;
import com.example.demo.domain.entities.Utilisateur;
import com.example.demo.dall.repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public abstract class UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public Utilisateur creerUtilisateur(Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }

    public List<Utilisateur> obtenirTousLesUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    public Optional<Utilisateur> obtenirUtilisateurParId(Long id) {
        return utilisateurRepository.findById(id);
    }

    public Optional<Utilisateur> obtenirUtilisateurParEmail(String email) {
        return utilisateurRepository.findByEmail(email);
    }

    public Optional<Utilisateur> verifierIdentifiants(String email, String motDePasse) {
        Optional<Utilisateur> utilisateur = utilisateurRepository.findByEmail(email);
        if ( utilisateur.isPresent() && utilisateur.get().getMotDePasse().equals(motDePasse) ) {
            return utilisateur;
        }
        return Optional.empty();
    }

    public abstract UtilisateurDTO getUtilisateurByEmail(String email);

    public abstract UtilisateurDTO createUtilisateur(UtilisateurDTO utilisateurDTO);

    public abstract UtilisateurDTO getUtilisateurById(Long id);

    public abstract List<UtilisateurDTO> getAllUtilisateurs();

    public abstract UtilisateurDTO updateUtilisateur(Long id, UtilisateurDTO utilisateurDTO);

    public abstract void deleteUtilisateur(Long id);

    public void supprimerUtilisateur(Long id) {
        if ( utilisateurRepository.existsById(id) ) {
            utilisateurRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("L'utilisateur avec l'id " + id + " n'existe pas.");
        }
    }
}

