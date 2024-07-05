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

const restrictedRoutes = express.Router();

/**
 * Middleware para verificar si el usuario tiene un token válido y es administrador.
 * 
 * @function
 * @name restrictedRoutes
 * @memberof Middleware
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para pasar al siguiente middleware
 * @throws {Error} Error si el usuario no tiene un token válido, no está autenticado o no es administrador
 */

restrictedRoutes.use((req, res, next) => {
    const token = req.cookies['access_token'];

    if (token) {
        jwt.verify(token, jwt_secret, async (err, decoded) => {
            let data = await User.existUser(decoded.email);
            if (data.islogged == true) {
                if (data.isadmin == true) {
                    req.decoded = decoded;
                    next();
                } else {
                    return res.json({ msg: 'No eres administrador' });
                }
            } else {
                return res.json({ msg: 'Tu token no mola nada' });
            }
        });
    } else {
        res.send({
            msg: 'Vas de chulo pero no tienes ni token'
        });
    }
});

module.exports = restrictedRoutes;