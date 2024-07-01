const usuariosWebController = require('../controllers/usuarios.web.controller');
const offerts = require('../controllers/ofertas.web.controller')
const router = require('express').Router();

router.get("/", offerts.getAllOfferts);

module.exports = router;