const ofertaService = require('../services/ofertas.sevices');
const Oferta = require('../models/ofertas.model'); // Asegúrate de usar el nombre correcto del modelo

const getAllOfferts = async (req, res) => {
    try {
        let offerts = await Oferta.find({},'-_id -__v'); //{}
        console.log(offerts)
        res.status(200).render("home", {Ofertas: offerts, msj:"TODAS LAS OFERTAS"}); // Respuesta de la API para 1 producto
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
}
//findOrSaveOfertas();

module.exports = { getAllOfferts };

