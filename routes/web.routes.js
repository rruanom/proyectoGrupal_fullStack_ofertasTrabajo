const usuariosWebController = require('../controllers/usuarios.web.controller');
const usuariosController = require('../controllers/usuarios.controller');
const offers = require('../controllers/ofertas.web.controller');
const favoritosWebController = require('../controllers/favoritos.web.controller');
const router = require('express').Router();
const protectedRoutes = require('../middlewares/verifiedToken');
const restrictedAdminRoutes = require('../middlewares/verifiedAdmin')
const mdVerifiedJWT = require('../middlewares/checkJwt')
const mdVerifiedAdmin = require('../middlewares/checkIsAdmin')

router.get("/", mdVerifiedJWT, mdVerifiedAdmin, offers.getOffers);
router.post('/', mdVerifiedJWT, mdVerifiedAdmin, offers.getOffers);

router.get("/login", mdVerifiedJWT, mdVerifiedAdmin, usuariosWebController.getLogin);
router.get("/logout", mdVerifiedJWT, mdVerifiedAdmin, usuariosController.logoutUser);
router.get("/registro", mdVerifiedJWT, mdVerifiedAdmin, usuariosWebController.getRegistro);
router.get("/perfil", mdVerifiedJWT, mdVerifiedAdmin, protectedRoutes, usuariosWebController.getPerfil);
router.get("/dashboard", mdVerifiedJWT, mdVerifiedAdmin, restrictedAdminRoutes, usuariosWebController.getDashboard);
router.get("/favoritos", mdVerifiedJWT, mdVerifiedAdmin, protectedRoutes, usuariosWebController.getFavoritos);
router.get("/users", mdVerifiedJWT, mdVerifiedAdmin, restrictedAdminRoutes, usuariosWebController.getUsers);
//router.post('/registo', usuariosWebController.createUser);

//favoritos
router.delete('/favoritos', mdVerifiedJWT, mdVerifiedAdmin, protectedRoutes, favoritosWebController.deleteFavoritoWeb);
router.post('/favoritos', mdVerifiedJWT, mdVerifiedAdmin, protectedRoutes, favoritosWebController.saveFavoritoWeb);

router.delete('/usuarios', mdVerifiedJWT, mdVerifiedAdmin, restrictedAdminRoutes, usuariosWebController.deleteUser);




module.exports = router;