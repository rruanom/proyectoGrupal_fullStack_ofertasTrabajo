const express = require('express');
const favoritosController = require("../controllers/favoritos.controller");
const router = express.Router();
const { validateGetFavoritosByEmail, validateCreateFavorito, validateDeleteFavorito } = require("../validators/favoritos.validator");


router.get('/', validateGetFavoritosByEmail, favoritosController.getFavoritosByEmail);
router.post('/', validateCreateFavorito, favoritosController.createFavorito);
router.delete('/', validateDeleteFavorito, favoritosController.deleteFavorito);


module.exports = router;