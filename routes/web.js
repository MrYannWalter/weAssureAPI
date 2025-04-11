import express from 'express';
import documentController from '../controllers/documentController.js';
import garantieController from '../controllers/garantieController.js';
import paiementController from '../controllers/paiementController.js';
import sinistreController from '../controllers/sinistreController.js';
import utilisateurController from '../controllers/utilisateurController.js';
import contratController from '../controllers/contratController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
    res.send('Welcome to the weAssureAPI');
});

// Document routes
router.post('/documents', authMiddleware, documentController.createDocument);
router.get('/documents', documentController.getDocuments);
router.get('/documents/:id', documentController.getDocumentById);
router.put('/documents/:id', authMiddleware, documentController.updateDocument);
router.delete('/documents/:id', authMiddleware, documentController.deleteDocument);

// Garantie routes
router.post('/garanties', authMiddleware, garantieController.createGarantie);
router.get('/garanties', garantieController.getGaranties);
router.get('/garanties/:id', garantieController.getGarantieById);
router.put('/garanties/:id', authMiddleware, garantieController.updateGarantie);
router.delete('/garanties/:id', authMiddleware, garantieController.deleteGarantie);

// Paiement routes
router.post('/paiements', authMiddleware, paiementController.createPaiement);
router.get('/paiements', paiementController.getPaiements);
router.get('/paiements/:id', paiementController.getPaiementById);
router.put('/paiements/:id', authMiddleware, paiementController.updatePaiement);
router.delete('/paiements/:id', authMiddleware, paiementController.deletePaiement);

// Sinistre routes
router.post('/sinistres', authMiddleware, sinistreController.createSinistre);
router.get('/sinistres', sinistreController.getSinistres);
router.get('/sinistres/:id', sinistreController.getSinistreById);
router.put('/sinistres/:id', authMiddleware, sinistreController.updateSinistre);
router.delete('/sinistres/:id', authMiddleware, sinistreController.deleteSinistre);

// Utilisateur routes
router.post('/utilisateurs', utilisateurController.createUser);
router.get('/utilisateurs', utilisateurController.getUsers);
router.get('/utilisateurs/:id', authMiddleware, utilisateurController.getUserById);
router.put('/utilisateurs/:id', authMiddleware, utilisateurController.updateUser);
router.delete('/utilisateurs/:id', authMiddleware, utilisateurController.deleteUser);
router.post('/login', utilisateurController.loginUser);
router.post('/logout', authMiddleware, utilisateurController.logoutUser);
router.post('/verify-code', utilisateurController.verifyCode); 

// Contrat routes
router.post('/contrats', authMiddleware, contratController.createContrat);
router.get('/contrats', contratController.getContrats);
router.get('/contrats/:id', contratController.getContratById);
router.put('/contrats/:id', authMiddleware, contratController.updateContrat);
router.delete('/contrats/:id', authMiddleware, contratController.deleteContrat);

export default router;
