const ofertaService = require('../services/ofertas.sevices');
const Oferta = require('../models/ofertas.model'); // Asegúrate de usar el nombre correcto del modelo

const getAllOfferts = async (req, res) => {
    try {
        let offerts = await Oferta.find({},' -__v'); //{}
        console.log(offerts)
        res.status(200).render("home", {Ofertas: offerts, msj:"TODAS LAS OFERTAS"}); // Respuesta de la API para 1 producto
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
};

const renderFilter = async (req, res) => {
    try {
        const keyword = req.body.inputBuscador || null;
        const updatedOfferts = await ofertaService.renderOfferts(keyword);
        console.log(updatedOfferts)
        res.status(200).render("home", {Ofertas: updatedOfferts, msj:`OFERTAS FILTRADAS POR ${keyword}`})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//findOrSaveOfertas();

module.exports = { 
    getAllOfferts,
    renderFilter
 };

