/**
 * @authors 
 * Antonio González
 * Roberto Ruano
 * Miguel Pardal  
 * @exports manage404
 * @namespace Middleware
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/usuarios.model');
const jwt_secret = process.env.ULTRA_SECRET_KEY;

const protectedRoutes = express.Router();

/**
 * Middleware para verificar si el usuario tiene un token válido y está autenticado.
 * 
 * @function
 * @name protectedRoutes
 * @memberof Middleware
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para pasar al siguiente middleware
 * @throws {Error} Error si el usuario no tiene un token válido o no está autenticado
 */

protectedRoutes.use((req, res, next) => {
    const token = req.cookies['access_token'];

    if (token) {
        jwt.verify(token, jwt_secret, async (err, decoded) => {
            let data = await User.existUser(decoded.email);
            if (data.islogged == true) {
                req.decoded = decoded;
                next();
            } else {
                return res.json({ msg: 'Token no valido' });
            }
        });
    } else {
        res.send({
            msg: 'Token no provisto'
        });
    }
});

module.exports = protectedRoutes;