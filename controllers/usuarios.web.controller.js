/**
 * @author Antonio González, Roberto Ruano, Miguel Pardal 
 * @exports manage404
 * @namespace Controllers
 */
/**
 * @namespace Controllers
 * @description Controladores para manejar las rutas web relacionadas con las vistas y la funcionalidad de usuarios y ofertas.
 * @requires ../services/ofertas.sevices
 * @requires ../models/usuarios.model
 */

const ofertasService = require('../services/ofertas.sevices');
const user = require('../models/usuarios.model');

/**
 * @function getHome
 * @description Renderiza la página de inicio.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error al renderizar la vista
 */
const getHome = async (req, res) => {
    const email = req.decoded.email;
    console.log('email', email);
    try {
        res.status(200).render("home.pug", { email });
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
};

/**
 * @function getLogin
 * @description Renderiza la página de login.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error al renderizar la vista
 */
const getLogin = async (req, res) => {
    try {
        res.status(200).render("login.pug");
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
};

/**
 * @function getRegistro
 * @description Renderiza la página de registro.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error al renderizar la vista
 */
const getRegistro = async (req, res) => {
    try {
        res.status(200).render("registro.pug");
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
};

/**
 * @function getPerfil
 * @description Renderiza la página de perfil de usuario.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error al renderizar la vista
 */
const getPerfil = async (req, res) => {
    const email = req.cookies['email'];
    const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
    try {
        const resp = await fetch(`${baseUrl}/api/usuarios?email=${email}`);
        const data = await resp.json();
        console.log('data', data);
        res.status(200).render("perfil.pug", { Usuario: data, email });
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
};

/**
 * @function getDashboard
 * @description Renderiza la página del dashboard para administradores.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error al renderizar la vista
 */
const getDashboard = async (req, res) => {
    const email = req.cookies['email'];
    const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
    try {
        const response = await fetch(`${baseUrl}/api/search`, {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify({ "fuente": "administrador" })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        res.status(200).render("dashboard.pug", { Ofertas: data, email });
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
};

/**
 * @function getFavoritos
 * @description Renderiza la página de ofertas favoritas del usuario.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error al renderizar la vista
 */
const getFavoritos = async (req, res) => {
    const email = req.cookies['email'];
    const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
    if (!email) {
        return res.status(400).json({ msg: 'Email not found in cookies' });
    }
    let arrayIdSQL = [];
    try {
        const resp = await fetch(`${baseUrl}/api/favoritos?email=${email}`);
        const data = await resp.json();
        data.forEach(element => {
            arrayIdSQL.push(element.id_oferta);
        });
        const favoritosMongo = await ofertasService.listaOfertasPorId(arrayIdSQL);
        res.status(200).render("favoritos.pug", { Favoritos: favoritosMongo || [], email });
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
};

/**
 * @function getUsers
 * @description Renderiza la página de gestión de usuarios.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error al renderizar la vista
 */
const getUsers = async (req, res) => {
    const email = req.cookies['email'];
    const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
    try {
        const resp = await fetch(`${baseUrl}/api/usuarios`);
        const data = await resp.json();
        res.status(200).render("users.pug", { Users: data, email });
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
};

/**
 * @function getUsersByEmail
 * @description Renderiza la página de gestión de usuarios filtrados por email.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error al renderizar la vista
 */
const getUsersByEmail = async (req, res) => {
    const email = req.cookies['email'];
    const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
    try {
        const resp = await fetch(`${baseUrl}/api/usuarios?email=${email}`);
        const data = await resp.json();
        res.status(200).render("users.pug", { Users: data, email });
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
};

/**
 * @function deleteUser
 * @description Elimina un usuario de la base de datos por su email.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error al eliminar el usuario
 */
const deleteUser = async (req, res) => {
    const { email } = req.body;
    console.log('C. Deleting user with email:', email);

    if (!email) {
        return res.status(400).json({ message: 'Missing email in request body' });
    }
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

module.exports = {
    getHome,
    getLogin,
    getRegistro,
    getPerfil,
    getDashboard,
    getFavoritos,
    getUsers,
    deleteUser,
    getUsersByEmail
};
