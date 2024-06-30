const express = require('express');
const router = express.Router();
const ofertasController = require('../controllers/ofertas.controller');
const { validateCreateOferta, validateDeleteOferta, validateGetOferta, validateUpdateOferta } = require("../validators/ofertas.validators");

//meter middleware de los validates
router.get('/search', ofertasController.getOfertas);
router.post('/ads', ofertasController.createOfertaController);
router.put('/ads', ofertasController.updateOfertaController);
router.delete('/ads', ofertasController.deleteOfertaController);

module.exports = router;