const favorito = require('../models/favoritos.model');
const user = require('../models/usuarios.model');
const { validationResult } = require("express-validator"); // Descomentar cuando se hayan realizado las validaciones
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const jwt_secret = process.env.ULTRA_SECRET_KEY;

const getUsers = async (req, res) => {
    try {
        if (req.query.email || req.query.email == '') {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const users = await user.getUserByEmail(req.query.email);
            return res.status(200).json(users);
        }
        else {
            const users = await user.getNonAdminUsers();
            return res.status(200).json(users);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
/*
const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newUser = req.body;
    try {
        const response = await user.createUser(newUser);
        res.status(201).json({
            "items_created": response,
            data: newUser
        });
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};
*/
const createUser = (req, res) => {
    const { name, lastname, username, email, password, image } = req.body;
    const isadmin = false; // Asegúrate de que isadmin sea siempre false para los nuevos usuarios
    const last_logged_date = new Date(); // Establece la fecha actual como el valor por defecto

    bcrypt.hash(password, 8, async (err, hash) => {
        if (err) throw err;
        try {
            const response = await user.createUser({ name, lastname, username, email, password: hash, image, isadmin, last_logged_date });
            res.status(201).redirect('/'); // Redirige a la página de inicio después del registro exitoso
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
    });
};

const updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const modifiedUser = req.body;
    try {
        const response = await user.updateUser(modifiedUser);
        res.status(201).json({
            "items_updated": response,
            data: modifiedUser
        });
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

const deleteUser = async (req, res) => {
    const { email } = req.body;
    try {
        const resp = await user.deleteUser(email);
        res.status(201).json({
            "items_deleted": resp,
            data: email
        });
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};


const loginUser = async (req, res) => {
    let data;
    try {
        const { email, password } = req.body;
        data = await user.existUser(email);
        console.log(data);
        if (!data) {
            res.status(400).json({ msg: 'Incorrect user or password' });
        } else {
            const match = await bcrypt.compare(password, data.password);
            if (match) {
                await user.setLoggedTrue(req.body.email);
                const { email, username, isadmin, islogged } = data;
                const userForToken = {
                    email: email,
                    username: username,
                    isadmin: isadmin,
                    islogged: islogged
                };
                const token = jwt.sign(userForToken, jwt_secret, { expiresIn: '20m' });

                // Set cookies
                res.cookie('access_token', token, { httpOnly: true, maxAge: 20 * 60 * 1000 }); // 20 minutes
                res.cookie('email', email, { httpOnly: true, maxAge: 20 * 60 * 1000 }); // 20 minutes

                res.status(200).json({
                    msg: 'Correct authentication',
                    token: token
                });

                const mensaje = document.querySelector('#mensaje');
                mensaje.innerHTML = `<p>Usuario logeado<p>`;
            } else {
                res.status(400).json({ msg: 'Incorrect user or password' });
            }
        }
    } catch (error) {
        console.log('Error:', error);
    }
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    loginUser
}

