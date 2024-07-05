/**
 * @author Antonio González, Roberto Ruano, Miguel Pardal 
 * @exports manage404
 * @namespace Controllers
 */
/**
 * @namespace Controllers
 * @description Controladores para manejar las rutas web relacionadas con los usuarios.
 * @requires ../models/favoritos.model
 * @requires ../models/usuarios.model
 * @requires express-validator
 * @requires bcryptjs
 * @requires jsonwebtoken
 * @requires cookie-parser
 */

const favorito = require('../models/favoritos.model');
const user = require('../models/usuarios.model');
const { validationResult } = require("express-validator"); // Descomentar cuando se hayan realizado las validaciones
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const jwt_secret = process.env.ULTRA_SECRET_KEY;

/**
 * @function getUsers
 * @description Obtiene los usuarios de la base de datos. Si se proporciona un email, busca por email.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error en la consulta a la base de datos
 */
const getUsers = async (req, res) => {
    try {
        if (req.query.email || req.query.email == '') {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const users = await user.getUserByEmail(req.query.email);
            return res.status(200).json(users);
        } else {
            const users = await user.getNonAdminUsers();
            return res.status(200).json(users);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @function createUser
 * @description Crea un nuevo usuario en la base de datos.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @throws {Error} Error en la consulta a la base de datos
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

/**
 * @function updateUser
 * @description Actualiza un usuario en la base de datos.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error en la consulta a la base de datos
 */
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

/**
 * @function deleteUser
 * @description Elimina un usuario de la base de datos por su email.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error en la consulta a la base de datos
 */
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

/**
 * @function loginUser
 * @description Inicia sesión de un usuario verificando su email y contraseña.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error en la consulta a la base de datos
 */
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

                user.setLoggedTrue(email);

                res.status(200).redirect('./');
            } else {
                res.status(400).json({ msg: 'Incorrect user or password' });
            }
        }
    } catch (error) {
        console.log('Error:', error);
    }
};

/**
 * @function logoutUser
 * @description Cierra la sesión de un usuario.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error en la consulta a la base de datos
 */
const logoutUser = async (req, res) => {
    try {
        const email = req.cookies.email;
        console.log(email);
        if (!email) {
            return res.status(400).json({ msg: 'No user is logged in' });
        }

        // Update the user's logged status in the database
        await user.setLoggedFalse(email);

        // Clear the cookies
        res.clearCookie('access_token');
        res.clearCookie('email');

        res.status(200).redirect('./');
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser
};
