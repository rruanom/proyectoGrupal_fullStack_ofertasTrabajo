const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/usuarios.model');
const jwt_secret = process.env.ULTRA_SECRET_KEY;

const verifiedIsAdmin = express.Router();

verifiedIsAdmin.use((req, res, next) => {
    console.log(req.user.islogged)
    res.locals.islogged = req.user?.islogged || false;
    res.locals.isadmin = req.user?.isadmin || false;
    console.log(res.locals.islogged)
    next();
});

module.exports = verifiedIsAdmin;