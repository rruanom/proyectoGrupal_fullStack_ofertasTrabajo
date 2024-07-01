const usuariosWebController = require('../controllers/usuarios.web.controller');
const router = require('express').Router();

router.get("/", usuariosWebController.getHome);
router.get("/login", usuariosWebController.getLogin);
router.get("/registro", usuariosWebController.getRegistro);
router.get("/perfil", usuariosWebController.getPerfil);
router.get("/dashboard", usuariosWebController.getDashboard);
router.get("/favoritos", usuariosWebController.getFavoritos);
router.get("/users", usuariosWebController.getUsers);
//router.post('/registo', usuariosWebController.createUser);

module.exports = router;