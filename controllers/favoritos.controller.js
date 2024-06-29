const favorito = require('../models/favoritos.model');
// const {validationResult} = require("express-validator"); // Descomentar cuando se hayan realizado las validaciones

const getFavoritosByEmail = async (req, res) => {
    let favoritos;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        favoritos = await favorito.getFavoritosByEmail(req.query.email);
        return res.status(200).json(favoritos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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

const deleteFavorito = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let favoritoToDelete;
    try {
        favoritoToDelete = await favorito.deleteEntry(req.query.titulo);
        res.status(200).json(favoritoToDelete); 
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
}


module.exports = {
    getFavoritosByEmail,
    createFavorito,
    deleteFavorito
}