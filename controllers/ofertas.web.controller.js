/**
 * @author Antonio González, Roberto Ruano, Miguel Pardal 
 * @exports manage404
 * @namespace Controllers
 */
/**
 * @namespace Controllers
 * @description Controladores para manejar las rutas web relacionadas con las ofertas.
 * @requires ../services/ofertas.services
 * @requires ../models/ofertas.model
 */

const ofertaService = require('../services/ofertas.services');
const Oferta = require('../models/ofertas.model'); 

/**
 * @function getOffers
 * @description Esta función obtiene las ofertas de la base de datos. Si se proporciona una palabra clave, realiza una búsqueda con dicha palabra y renderiza la vista "home".
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error en la consulta a la base de datos
 */
const getOffers = async (req, res) => {
    const email = req.cookies['email'];
    try {
        const keyword = req.body.inputBuscador || null;
        if (keyword) {
            const updatedOfferts = await ofertaService.renderOfferts(keyword);
            res.status(200).render("home", { Ofertas: updatedOfferts, msj: `OFERTAS FILTRADAS POR ${keyword}`, email });
        } else {
            let offerts = await Oferta.find({}, '-__v');
            res.status(200).render("home", { Ofertas: offerts, msj: "TODAS LAS OFERTAS", email });
        }
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
};

/**
 * @function deleteOffer
 * @description Esta función elimina una oferta de la base de datos por su título.
 * @memberof Controllers
 * @param {Object} req Objeto de solicitud
 * @param {Object} res Objeto de respuesta
 * @async
 * @throws {Error} Error en la consulta a la base de datos
 */
const deleteOffer = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Missing title in request body' });
    }
    try {
        const resp = await ofertaService.deleteOferta(title);
        res.status(201).json({
            "items_deleted": resp,
            data: title
        });
    } catch (error) {
        res.status(500).json({ error: "Error en la BbDD" });
    }
};

module.exports = {
    getOffers,
    deleteOffer
};
