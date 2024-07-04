const favorito = require('../models/favoritos.model'); 

const deleteFavoritoWeb = async (req, res) => {

    const { id_oferta } = req.body; 
    const email = req.body.email; 

    console.log('Deleting favorito with id_oferta:', id_oferta, 'and email:', email);

    if (!id_oferta || !email) {
        return res.status(400).json({ message: 'Missing id_oferta or email in request body' });
    }

    try {
        const result = await favorito.deleteFavorito(id_oferta, email);
        if (result > 0) {
            res.status(200).json({ message: "Favorito borrado" });
        } else {
            res.status(404).json({ message: "Favorito not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

const saveFavoritoWeb = async (req, res) => {
    const { email, id_oferta } = req.body; 

    console.log(email);
    email = req.decoded.email;

    console.log('Controller Saving favorito with id_oferta:', id_oferta, 'and email:', email);

    if (!id_oferta || !email) {
        return res.status(400).json({ message: 'Missing id_oferta or email in request body' });
    }

    try {
        const result = await favorito.createFavorito({ email, id_oferta });
        if (result > 0) {
            res.status(200).json({ message: "Favorito saved" });
        } else {
            res.status(500).json({ message: "Failed to save favorito" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

module.exports = {
    deleteFavoritoWeb,
    saveFavoritoWeb
};
