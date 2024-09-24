package com.example.demo;


import com.example.demo.api.model.dto.UtilisateurDTO;
import com.example.demo.bll.serviceImpl.UtilisateurServiceImpl;
import com.example.demo.domain.entities.Utilisateur;
import com.example.demo.dall.repository.UtilisateurRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UtilisateurServiceImplTest {

    @Mock
    private UtilisateurRepository utilisateurRepository;

    @InjectMocks
    private UtilisateurServiceImpl utilisateurService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetUtilisateurByEmail() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("test@example.com");

        when(utilisateurRepository.findByEmail("test@example.com")).thenReturn(Optional.of(utilisateur));

        UtilisateurDTO result = utilisateurService.getUtilisateurByEmail("test@example.com");

        assertNotNull(result);
        assertEquals("test@example.com", result.getEmail());
        verify(utilisateurRepository, times(1)).findByEmail("test@example.com");
    }

    @Test
    public void testGetUtilisateurByEmail_NotFound() {
        when(utilisateurRepository.findByEmail("unknown@example.com")).thenReturn(Optional.empty());

        UtilisateurDTO result = utilisateurService.getUtilisateurByEmail("unknown@example.com");

        assertNull(result);
        verify(utilisateurRepository, times(1)).findByEmail("unknown@example.com");
    }

    @Test
    public void testCreateUtilisateur() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setEmail("test@example.com");

        UtilisateurDTO utilisateurDTO = new UtilisateurDTO();
        utilisateurDTO.setEmail("test@example.com");

        when(utilisateurRepository.save(any(Utilisateur.class))).thenReturn(utilisateur);

        UtilisateurDTO result = utilisateurService.createUtilisateur(utilisateurDTO);

        assertNotNull(result);
        assertEquals("test@example.com", result.getEmail());
        verify(utilisateurRepository, times(1)).save(any(Utilisateur.class));
    }

    @Test
    public void testGetUtilisateurById() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setId(1L);

        when(utilisateurRepository.findById(1L)).thenReturn(Optional.of(utilisateur));

        UtilisateurDTO result = utilisateurService.getUtilisateurById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(utilisateurRepository, times(1)).findById(1L);
    }

    @Test
    public void testGetUtilisateurById_NotFound() {
        when(utilisateurRepository.findById(1L)).thenReturn(Optional.empty());

        UtilisateurDTO result = utilisateurService.getUtilisateurById(1L);

        assertNull(result);
        verify(utilisateurRepository, times(1)).findById(1L);
    }

    @Test
    public void testGetAllUtilisateurs() {
        List<Utilisateur> utilisateurs = new ArrayList<>();
        Utilisateur utilisateur = new Utilisateur();
        utilisateurs.add(utilisateur);

        when(utilisateurRepository.findAll()).thenReturn(utilisateurs);

        List<UtilisateurDTO> result = utilisateurService.getAllUtilisateurs();

        assertEquals(1, result.size());
        verify(utilisateurRepository, times(1)).findAll();
    }

    @Test
    public void testUpdateUtilisateur() {
        Utilisateur utilisateurExistant = new Utilisateur();
        utilisateurExistant.setId(1L);
        utilisateurExistant.setEmail("old@example.com");

        UtilisateurDTO utilisateurDTO = new UtilisateurDTO();
        utilisateurDTO.setEmail("new@example.com");

        when(utilisateurRepository.findById(1L)).thenReturn(Optional.of(utilisateurExistant));
        when(utilisateurRepository.save(any(Utilisateur.class))).thenReturn(utilisateurExistant);

        UtilisateurDTO result = utilisateurService.updateUtilisateur(1L, utilisateurDTO);

        assertNotNull(result);
        assertEquals("new@example.com", result.getEmail());
        verify(utilisateurRepository, times(1)).findById(1L);
        verify(utilisateurRepository, times(1)).save(any(Utilisateur.class));
    }

    @Test
    public void testDeleteUtilisateur() {
        doNothing().when(utilisateurRepository).deleteById(1L);

        utilisateurService.deleteUtilisateur(1L);

        verify(utilisateurRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testSupprimerUtilisateur_Existing() {
        when(utilisateurRepository.existsById(1L)).thenReturn(true);
        doNothing().when(utilisateurRepository).deleteById(1L);

        utilisateurService.supprimerUtilisateur(1L);

        verify(utilisateurRepository, times(1)).existsById(1L);
        verify(utilisateurRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testSupprimerUtilisateur_NotFound() {
        when(utilisateurRepository.existsById(1L)).thenReturn(false);

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> {
            utilisateurService.supprimerUtilisateur(1L);
        });

        assertEquals("Utilisateur avec l'id 1 n'existe pas.", exception.getMessage());
        verify(utilisateurRepository, times(1)).existsById(1L);
    }
}

