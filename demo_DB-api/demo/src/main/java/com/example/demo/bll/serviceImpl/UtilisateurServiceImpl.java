package com.example.demo.bll.serviceImpl;

import com.example.demo.api.model.dto.UtilisateurDTO;
import com.example.demo.bll.service.UtilisateurService;
import com.example.demo.dall.repository.UtilisateurRepository;
import com.example.demo.domain.entities.Utilisateur;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UtilisateurServiceImpl extends UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Override
    public UtilisateurDTO getUtilisateurByEmail(String email) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email).orElse(null);
        return convertToDTO(utilisateur);
    }

    @Override
    public UtilisateurDTO createUtilisateur(UtilisateurDTO utilisateurDTO) {
        Utilisateur utilisateur = convertToEntity(utilisateurDTO);
        utilisateur = utilisateurRepository.save(utilisateur);
        return convertToDTO(utilisateur);
    }

    @Override
    public UtilisateurDTO getUtilisateurById(Long id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id).orElse(null);
        return convertToDTO(utilisateur);
    }

    @Override
    public List<UtilisateurDTO> getAllUtilisateurs() {
        List<Utilisateur> utilisateurs = utilisateurRepository.findAll();
        return utilisateurs.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public UtilisateurDTO updateUtilisateur(Long id, UtilisateurDTO utilisateurDTO) {
        Utilisateur utilisateur = utilisateurRepository.findById(id).orElse(null);
        if ( utilisateur != null ) {
            utilisateur.setEmail(utilisateurDTO.getEmail());
            utilisateur.setNom(utilisateurDTO.getNom());
            utilisateur.setPrenom(utilisateurDTO.getPrenom());
            utilisateur.setRole(utilisateurDTO.getRole());
            utilisateur = utilisateurRepository.save(utilisateur);
        }
        return convertToDTO(utilisateur);
    }

    @Override
    public void deleteUtilisateur(Long id) {
        utilisateurRepository.deleteById(id);
    }

    @Override
    public void supprimerUtilisateur(Long id) {
        if ( utilisateurRepository.existsById(id) ) {
            utilisateurRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Utilisateur avec l'id " + id + " n'existe pas.");
        }
    }

    private UtilisateurDTO convertToDTO(Utilisateur utilisateur) {
        if ( utilisateur == null ) {
            return null;
        }
        UtilisateurDTO dto = new UtilisateurDTO();
        dto.setId(utilisateur.getId());
        dto.setEmail(utilisateur.getEmail());
        dto.setNom(utilisateur.getNom());
        dto.setPrenom(utilisateur.getPrenom());
        dto.setRole(utilisateur.getRole());
        return dto;
    }

    private Utilisateur convertToEntity(UtilisateurDTO dto) {
        if ( dto == null ) {
            return null;
        }
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setId(dto.getId());
        utilisateur.setEmail(dto.getEmail());
        utilisateur.setNom(dto.getNom());
        utilisateur.setPrenom(dto.getPrenom());
        utilisateur.setRole(dto.getRole());
        return utilisateur;
    }
}



