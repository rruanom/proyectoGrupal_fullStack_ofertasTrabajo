const usuariosWebController = require('../controllers/usuarios.web.controller');
const offers = require('../controllers/ofertas.web.controller')
const router = require('express').Router();
const protectedRoutes = require('../middlewares/verifiedToken');
const restrictedAdminRoutes = require('../middlewares/verifiedAdmin')

router.get("/", offers.getOffers);
router.post('/', offers.getOffers);

router.get("/login", usuariosWebController.getLogin);
router.get("/registro", usuariosWebController.getRegistro);
router.get("/perfil", usuariosWebController.getPerfil);
router.get("/dashboard", restrictedAdminRoutes, usuariosWebController.getDashboard);
router.get("/favoritos", usuariosWebController.getFavoritos);
router.get("/users", usuariosWebController.getUsers);
//router.post('/registo', usuariosWebController.createUser);



module.exports = router;