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
 * @description Controladores para manejar las rutas web relacionadas con las ofertas.
 * @requires express
 * @requires ../services/ofertas.services
 * @requires ../models/ofertas.model
 */

const { response } = require('express');
const ofertaService = require('../services/ofertas.services');
const Oferta = require('../models/ofertas.model');

/**
 * @function getOfertas
 * @description Esta función obtiene las ofertas de la base de datos. Si se proporciona una palabra clave, realiza una búsqueda con dicha palabra.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error en la consulta a la base de datos
 */
const getOfertas = async (req, res) => {
    try {
        const keyword = req.body.inputBuscador || null;
        if (keyword) {
            const updatedOfferts = await ofertaService.renderOfferts(keyword);
            res.status(200).json(updatedOfferts);
        } else {
            let offerts = await Oferta.find({}, '-_id -__v');
            res.status(200).json(offerts);
        }
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
};

/**
 * @function createOfertaController
 * @description Esta función crea una nueva oferta en la base de datos.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error en la consulta a la base de datos
 */
const createOfertaController = async (req, res) => {
    console.log(req.body);
    const { title, empresa, salario, localizacion, url, logo, fuente } = req.body;
    if (title && empresa && salario && localizacion && url && logo && fuente) {
        try {
            const response = await ofertaService.createOferta(title, empresa, salario, localizacion, url, logo, fuente);
            res.status(201).json({
                "items_created": response,
                data: req.body
            });
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    } else {
        res.status(400).json({ error: "Faltan campos de oferta" });
    }
};

/**
 * @function updateOfertaController
 * @description Esta función actualiza una oferta existente en la base de datos.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error en la consulta a la base de datos
 */
const updateOfertaController = async (req, res) => {
    const filter = req.query;
    const update = req.body;
    try {
        const modifiedOferta = await ofertaService.updateOferta(filter, update);
        res.status(200).json(modifiedOferta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * @function deleteOfertaController
 * @description Esta función elimina una oferta de la base de datos por su título.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error en la consulta a la base de datos
 */
const deleteOfertaController = async (req, res) => {
    const { title } = req.body;
    try {
        const resp = await ofertaService.deleteOferta(title);
        res.status(201).json({
            "items_deleted": resp,
            data: title
        });
    } catch (error) {
        res.status(500).json({ error: "Error en la BDD" });
    }
};

module.exports = {
    getOfertas,
    createOfertaController,
    updateOfertaController,
    deleteOfertaController,
};
