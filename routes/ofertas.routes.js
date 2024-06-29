const express = require('express');
const router = express.Router();
const ofertasController = require('../controllers/ofertas.controllers');
const { validateCreateOferta, validateDeleteOferta, validateGetOferta, validateUpdateOferta } = require("../validators/ofertas.validators");

router.get('/',validateGetOfertas, ofertasController.getProducts);
router.post('/',validateCreateOfertas, ofertasController.createOfertaController);
router.put('/',validateUpdateOfertas, ofertasController.updateOfertaController);
router.delete('/',validateDeleteOfertas, ofertasController.deleteOfertaController);

module.exports = router;