const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/usuarios.model');
const jwt_secret = process.env.ULTRA_SECRET_KEY;

/**
 * Middleware para verificar si el usuario está autenticado y tiene privilegios de administrador.
 * 
 * @function
 * @name verifiedIsAdmin
 * @memberof Middleware
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para pasar al siguiente middleware
 * @throws {Error} Error si el usuario no está autenticado o no tiene privilegios de administrador
 */

const verifiedIsAdmin = express.Router();

verifiedIsAdmin.use((req, res, next) => {
    console.log(req.user.islogged)
    res.locals.islogged = req.user?.islogged || false;
    res.locals.isadmin = req.user?.isadmin || false;
    console.log(res.locals.islogged)
    next();
});

module.exports = verifiedIsAdmin;