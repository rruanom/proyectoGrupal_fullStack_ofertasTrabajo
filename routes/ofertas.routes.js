const express = require('express');
const router = express.Router();
const ofertasController = require('../controllers/ofertas.controller');
//const { validateCreateOferta, validateDeleteOferta, validateUpdateOferta } = require("../validators/ofertas.validators");

//meter middleware de los validates
router.get('/search', ofertasController.getOfertas);
router.post('/search', ofertasController.getOfertas)
router.post('/ads', ofertasController.createOfertaController);
router.put('/ads', ofertasController.updateOfertaController);
router.delete('/ads', ofertasController.deleteOfertaController);
module.exports = router;


//Ejemplos
// GET http://localhost:3000/api/search --> ALL
// POST http://localhost:3000/api/ads
prueba = {
    "title": "prueba",
    "empresa": "empresa de prueba",
    "salario": "30.000€",
    "localizacion": "Madrid",
    "logo": "nuevo logo",
    "url": "www.google.com"
}

// PUT http://localhost:3000/api/ads?title=prueba
