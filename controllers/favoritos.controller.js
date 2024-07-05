/**
 * @authors 
 * Antonio González
 * Roberto Ruano
 * Miguel Pardal  
 * @exports manage404
 * @namespace Middleware
 */
/**
 * @namespace Controllers
 * @description Controladores para manejar las rutas relacionadas con los favoritos.
 * @requires ../models/favoritos.model
 * @requires ../models/usuarios.model
 * @requires express-validator
 */

const favorito = require('../models/favoritos.model');
const user = require('../models/usuarios.model');
const { validationResult } = require("express-validator"); // Descomentar cuando se hayan realizado las validaciones

/**
 * @function getFavoritosByEmail
 * @description Esta función obtiene todos los favoritos de un usuario por su email.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error en la consulta a la base de datos o error de validación
 */
const getFavoritosByEmail = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let favoritos;
    let userSearch;
    try {
        if (req.query.email) {
            userSearch = await user.getUserByEmail(req.query.email);
            if (userSearch.length > 0) {
                favoritos = await favorito.getFavoritosByEmail(req.query.email);
                return res.status(200).json(favoritos);
            } else {
                res.status(404).json("Usuario no existe");
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @function createFavorito
 * @description Esta función crea un nuevo favorito en la base de datos.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error en la consulta a la base de datos o error de validación
 */
const createFavorito = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newFav = req.body;
    try {
        const response = await favorito.createFavorito(newFav);
        res.status(201).json({
            "items_created": response,
            data: newFav
        });
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

/**
 * @function deleteFavorito
 * @description Esta función elimina un favorito de la base de datos.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error en la consulta a la base de datos o error de validación
 */
const deleteFavorito = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { id_oferta, email } = req.body;
    try {
        const result = await favorito.deleteFavorito(id_oferta, email);
        if (result > 0) {
            res.status(200).json({ message: "Favorito borrado" });
        } else {
            res.status(404).json({ message: "Favorito no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

module.exports = {
    getFavoritosByEmail,
    createFavorito,
    deleteFavorito
};
