package com.example.demo;


import com.example.demo.api.controller.UtilisateurController;
import com.example.demo.bll.service.UtilisateurService;
import com.example.demo.domain.entities.Utilisateur;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class UtilisateurControllerTests {

    @Mock
    private UtilisateurService utilisateurService;

    @InjectMocks
    private UtilisateurController utilisateurController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreerUtilisateur() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setNom("John");

        when(utilisateurService.creerUtilisateur(utilisateur)).thenReturn(utilisateur);

        ResponseEntity<Utilisateur> response = utilisateurController.creerUtilisateur(utilisateur);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(utilisateur, response.getBody());
        verify(utilisateurService, times(1)).creerUtilisateur(utilisateur);
    }

    @Test
    public void testObtenirTousLesUtilisateurs() {
        List<Utilisateur> utilisateurs = new ArrayList<>();
        utilisateurs.add(new Utilisateur());

        when(utilisateurService.obtenirTousLesUtilisateurs()).thenReturn(utilisateurs);

        ResponseEntity<List<Utilisateur>> response = utilisateurController.obtenirTousLesUtilisateurs();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(utilisateurs, response.getBody());
        verify(utilisateurService, times(1)).obtenirTousLesUtilisateurs();
    }

    @Test
    public void testObtenirUtilisateurParId() {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setId(1L);

        when(utilisateurService.obtenirUtilisateurParId(1L)).thenReturn(Optional.of(utilisateur));

        ResponseEntity<Utilisateur> response = utilisateurController.obtenirUtilisateurParId(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(utilisateur, response.getBody());
        verify(utilisateurService, times(1)).obtenirUtilisateurParId(1L);
    }

    @Test
    public void testObtenirUtilisateurParId_NotFound() {
        when(utilisateurService.obtenirUtilisateurParId(1L)).thenReturn(Optional.empty());

        ResponseEntity<Utilisateur> response = utilisateurController.obtenirUtilisateurParId(1L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(utilisateurService, times(1)).obtenirUtilisateurParId(1L);
    }

    @Test
    public void testMettreAJourUtilisateur() {
        Utilisateur utilisateurExistant = new Utilisateur();
        utilisateurExistant.setId(1L);
        utilisateurExistant.setNom("John");

        Utilisateur utilisateurDetails = new Utilisateur();
        utilisateurDetails.setNom("Doe");

        when(utilisateurService.obtenirUtilisateurParId(1L)).thenReturn(Optional.of(utilisateurExistant));
        when(utilisateurService.creerUtilisateur(utilisateurExistant)).thenReturn(utilisateurExistant);

        ResponseEntity<Utilisateur> response = utilisateurController.mettreAJourUtilisateur(1L, utilisateurDetails);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(utilisateurDetails.getNom(), response.getBody().getNom());
        verify(utilisateurService, times(1)).obtenirUtilisateurParId(1L);
        verify(utilisateurService, times(1)).creerUtilisateur(utilisateurExistant);
    }

    @Test
    public void testSupprimerUtilisateur() {
        doNothing().when(utilisateurService).supprimerUtilisateur(1L);

        ResponseEntity<Void> response = utilisateurController.supprimerUtilisateur(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(utilisateurService, times(1)).supprimerUtilisateur(1L);
    }

    @Test
    public void testSupprimerUtilisateur_NotFound() {
        doThrow(new IllegalArgumentException()).when(utilisateurService).supprimerUtilisateur(1L);

        ResponseEntity<Void> response = utilisateurController.supprimerUtilisateur(1L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(utilisateurService, times(1)).supprimerUtilisateur(1L);
    }
}
