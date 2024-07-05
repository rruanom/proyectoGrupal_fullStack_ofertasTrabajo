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
 * @description Controladores para manejar las rutas web relacionadas con los favoritos.
 * @requires ../models/favoritos.model
 */

const favorito = require('../models/favoritos.model');

/**
 * @function deleteFavoritoWeb
 * @description Esta función elimina un favorito de la base de datos a través de una solicitud web.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error en la consulta a la base de datos
 */
const deleteFavoritoWeb = async (req, res) => {
    const { id_oferta, email } = req.body;

    console.log('Deleting favorito with id_oferta:', id_oferta, 'and email:', email);

    if (!id_oferta || !email) {
        return res.status(400).json({ message: 'Missing id_oferta or email in request body' });
    }

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

/**
 * @function saveFavoritoWeb
 * @description Esta función guarda un nuevo favorito en la base de datos a través de una solicitud web.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error en la consulta a la base de datos
 */
const saveFavoritoWeb = async (req, res) => {
    let { email, id_oferta } = req.body;

    console.log('Controller Saving favorito with id_oferta:', id_oferta, 'and email:', email);

    email = req.decoded.email;

    if (!id_oferta || !email) {
        return res.status(400).json({ message: 'Missing id_oferta or email in request body' });
    }

    try {
        const result = await favorito.createFavorito({ email, id_oferta });
        if (result > 0) {
            res.status(200).json({ message: "Favorito guardado" });
        } else {
            res.status(500).json({ message: "Fallo al guardar el favorito" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

module.exports = {
    deleteFavoritoWeb,
    saveFavoritoWeb
};
