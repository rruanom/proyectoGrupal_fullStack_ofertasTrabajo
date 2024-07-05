const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/usuarios.model');
const jwt_secret = process.env.ULTRA_SECRET_KEY;

const verifiedJWT = express.Router();

/**
 * Middleware para verificar si el usuario está autenticado y tiene privilegios de administrador.
 * 
 * @name verifiedJWT
 * @memberof Middleware
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para pasar al siguiente middleware
 * @throws {Error} Error si el usuario no está autenticado o no tiene privilegios de administrador
 */

verifiedJWT.use((req, res, next) => {
    const token = req.cookies['access_token'];
    if (!token) {
        req.user = { islogged: false, isadmin: false };
        console.log('no token :', req.user)
        return next();
    }

    jwt.verify(token, jwt_secret, (err, decoded) => {
        if (err) {
            req.user = { islogged: false, isadmin: false };
            console.log('token pero error :', req.user)
        } else {
            req.user = decoded;
            console.log('token bien :', req.user)
        }
        next();
    });
});

module.exports = verifiedJWT;