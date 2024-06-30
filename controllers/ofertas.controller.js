const { response } = require('express');
const ofertaService = require('../services/ofertas.services');
//const { validationResult } = require("express-validator");

const getOfertas = async (req, res) => {
    let ofertas;
    try {
        // Validate request
        /* const errors = validationResult(req);
        if (!errors.isEmpty()) { 
            return res.status(400).json({ errors: errors.array() });
        }*/
        providers = await providerService.listProviders();
        res.status(200).json(providers); // [] con las authors encontradas
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createOfertaController = async (req, res) => {// Validate request
    /* const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } */
    const { title, empresa, salario, localizacion, logo, url } = req.body;
    if (title && empresa && salario && localizacion && logo  && url) {
        try {
            const response = await ofertaService.createOferta(title, empresa, salario, localizacion, logo, url);
            res.status(201).json({
                "items_created": response,
                data: req.body
            });
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    } else {
        res.status(400).json({ error: "Faltan campos de provider" });
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
        res.status(200).json(providers); // [] con los providers encontradas
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

module.exports = {
    getOfertas,
    createOfertaController,
    updateOfertaController,
    deleteOfertaController
};