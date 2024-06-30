const express = require('express');
const usuariosController = require("../controllers/usuarios.controller");
const router = express.Router();
const { validateGetUserByEmail, validateCreateUser, validateUpdateUser, validateDeleteUser } = require("../validators/usuarios.validator");


router.get('/', validateGetUserByEmail, usuariosController.getUsers);
router.post('/', validateCreateUser, usuariosController.createUser);
router.put('/', validateUpdateUser, usuariosController.updateUser);
router.delete('/', validateDeleteUser, usuariosController.deleteUser);


module.exports = router;