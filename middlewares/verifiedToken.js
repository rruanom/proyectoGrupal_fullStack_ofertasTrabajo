const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/usuarios.model');
const jwt_secret = process.env.ULTRA_SECRET_KEY;

const protectedRoutes = express.Router();

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