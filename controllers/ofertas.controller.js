const { response } = require('express');
const ofertaService = require('../services/ofertas.sevices');
const Oferta = require('../models/ofertas.model'); 

//const { validationResult } = require("express-validator");

const getOfertas = async (req, res) => {
    try {
        const keyword = req.body.inputBuscador || null;
        if (keyword) {
            const updatedOfferts = await ofertaService.renderOfferts(keyword);
            console.log(updatedOfferts)
            res.status(200).json(updatedOfferts);        
        } else {
            let offerts = await Oferta.find({}, '-_id -__v'); //{}
            console.log(offerts)
            res.status(200).json(offerts);        }
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
};

const createOfertaController = async (req, res) => {// Validate request
    /* const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } */
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

const updateOfertaController = async (req, res) => {
    filter = req.query;
    update = req.body;
    // Validate request
    /* const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } */
        try {
            const modifiedOferta = await ofertaService.updateOferta(filter, update);
            res.status(200).json(modifiedOferta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
};

const deleteOfertaController = async (req, res) => {
    // Validate request
    /* const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } */
    let oferta;
    try {
        oferta = await ofertaService.deleteOferta(req.query.title);
        res.status(200).json(ofertaferta); // [] con los providers encontradas
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

module.exports = {
    getOfertas,
    createOfertaController,
    updateOfertaController,
    deleteOfertaController,
};