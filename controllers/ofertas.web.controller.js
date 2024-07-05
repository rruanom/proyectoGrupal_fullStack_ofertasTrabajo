const ofertaService = require('../services/ofertas.sevices');
const Oferta = require('../models/ofertas.model'); 


const getOffers = async (req, res) => {
    const email = req.cookies['email'];
    try {
        const keyword = req.body.inputBuscador || null;
        if (keyword) {
            const updatedOfferts = await ofertaService.renderOfferts(keyword);
            res.status(200).render("home", { Ofertas: updatedOfferts, msj: `OFERTAS FILTRADAS POR ${keyword}`, email })
        } else {
            let offerts = await Oferta.find({}, '-__v'); //{}
            res.status(200).render("home", { Ofertas: offerts, msj: "TODAS LAS OFERTAS", email }); // Respuesta de la API para 1 producto
        }
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
};

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

//findOrSaveOfertas();

module.exports = {
    getOffers,
    deleteOffer
};

