const usuariosWebController = require('../controllers/usuarios.web.controller');
const router = require('express').Router();

router.get("/", usuariosWebController.getHome);

module.exports = router;