const ofertaService = require('../services/ofertas.sevices');
const Oferta = require('../models/ofertas.model'); 


const getOffers = async (req, res) => {
    try {
        const keyword = req.body.inputBuscador || null;
        if (keyword) {
            const updatedOfferts = await ofertaService.renderOfferts(keyword);
            res.status(200).render("home", { Ofertas: updatedOfferts, msj: `OFERTAS FILTRADAS POR ${keyword}` })
        } else {
            let offerts = await Oferta.find({}, '-__v'); //{}
            res.status(200).render("home", { Ofertas: offerts, msj: "TODAS LAS OFERTAS" }); // Respuesta de la API para 1 producto
        }
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
};

//findOrSaveOfertas();

module.exports = {
    getOffers
};

