const express = require('express');
const usuariosController = require("../controllers/usuarios.controller");
const router = express.Router();
// const { validateGetAuthorsByEmail, validateCreateAuthor, validateUpdateAuthor, validateDeleteAuthor } = require("../validators/authors.validator");


router.get('/', usuariosController.getUsers);
router.post('/', usuariosController.createUser);
router.put('/', usuariosController.updateUser);
router.delete('/', usuariosController.deleteUser);


module.exports = router;