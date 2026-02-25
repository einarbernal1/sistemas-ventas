const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Definimos los endpoints que apuntan a las funciones del controlador
router.post('/registro', authController.registrar);
router.post('/login', authController.login);

module.exports = router;