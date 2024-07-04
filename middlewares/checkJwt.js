const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/usuarios.model');
const jwt_secret = process.env.ULTRA_SECRET_KEY;

const verifiedJWT = express.Router();

const verifyJWT = (req, res, next) => {
    const token = req.cookies['authorization'];
    if (!token) {
        req.user = { islogged: false, isadmin: false };
        return next();
    }

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            req.user = { islogged: false, isadmin: false };
        } else {
            req.user = decoded;
        }
        next();
    });
};

module.exports = verifiedJWT;