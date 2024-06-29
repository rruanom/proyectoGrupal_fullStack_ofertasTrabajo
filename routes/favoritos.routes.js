const express = require('express');
const favoritosController = require("../controllers/favoritos.controller");
const router = express.Router();
// const { validateGetAuthorsByEmail, validateCreateAuthor, validateUpdateAuthor, validateDeleteAuthor } = require("../validators/authors.validator");


router.get('/', favoritosController.getFavoritosByEmail);
router.post('/', favoritosController.createFavorito);
router.delete('/', favoritosController.deleteFavorito);


module.exports = router;