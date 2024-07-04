const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/usuarios.model');
const jwt_secret = process.env.ULTRA_SECRET_KEY;

const verifiedJWT = express.Router();

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