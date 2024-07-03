const usuariosWebController = require('../controllers/usuarios.web.controller');
const offers = require('../controllers/ofertas.web.controller')
const router = require('express').Router();


router.get("/", offers.getAllOfferts);
router.get("/login", usuariosWebController.getLogin);
router.get("/registro", usuariosWebController.getRegistro);
router.get("/perfil", usuariosWebController.getPerfil);
router.get("/dashboard", usuariosWebController.getDashboard);
router.get("/favoritos", usuariosWebController.getFavoritos);
router.get("/users", usuariosWebController.getUsers);
//router.post('/registo', usuariosWebController.createUser);
router.get("/", offers.getAllOfferts);
router.post('/', offers.renderFilter);



module.exports = router;