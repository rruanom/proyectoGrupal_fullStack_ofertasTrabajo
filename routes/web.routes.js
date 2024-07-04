const usuariosWebController = require('../controllers/usuarios.web.controller');
const offers = require('../controllers/ofertas.web.controller');
const favoritosWebController = require('../controllers/favoritos.web.controller');
const router = require('express').Router();
const protectedRoutes = require('../middlewares/verifiedToken');
const restrictedAdminRoutes = require('../middlewares/verifiedAdmin')
const mdVerifiedJWT = require('../middlewares/checkJwt')
const mdVerifiedAdmin = require('../middlewares/checkIsAdmin')

router.get("/", mdVerifiedJWT, mdVerifiedAdmin, offers.getOffers);
router.post('/', mdVerifiedJWT, mdVerifiedAdmin, offers.getOffers);

router.get("/login", usuariosWebController.getLogin);
router.get("/registro", usuariosWebController.getRegistro);
router.get("/perfil", usuariosWebController.getPerfil);
router.get("/dashboard", restrictedAdminRoutes, usuariosWebController.getDashboard);
router.get("/favoritos", usuariosWebController.getFavoritos);
router.get("/users", usuariosWebController.getUsers);
//router.post('/registo', usuariosWebController.createUser);

//favoritos
router.delete('/favoritos', favoritosWebController.deleteFavoritoWeb);
router.post('/favoritos',  mdVerifiedJWT, mdVerifiedAdmin, favoritosWebController.saveFavoritoWeb);

router.delete('/usuarios', usuariosWebController.deleteUser);




module.exports = router;