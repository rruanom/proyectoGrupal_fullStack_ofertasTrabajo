const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/usuarios.model');
const jwt_secret = process.env.ULTRA_SECRET_KEY;

const restrictedRoutes = express.Router();

restrictedRoutes.use((req, res, next) => {
    const token = req.cookies['access_token'];

    if (token) {
        jwt.verify(token, jwt_secret, async (err, decoded) => {
            let data = await User.existUser(decoded.email);
            if (data.logged == true) {
                if (data.isadmin == true) {
                    req.decoded = decoded;
                    next();
                } else {
                    return res.json({ msg: 'No eres administrador' });
                }
            } else {
                return res.json({ msg: 'Invalid token' });
            }
        });
    } else {
        res.send({
            msg: 'Token not provided'
        });
    }
});

module.exports = restrictedRoutes;