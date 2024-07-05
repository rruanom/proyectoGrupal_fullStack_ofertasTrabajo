/**
 * @authors 
 * Antonio González
 * Roberto Ruano
 * Miguel Pardal  
 * @exports manage404
 * @namespace Middleware
 */
/**
 * @namespace MongoDB
 * @description Configuración de Mongoose y definición del modelo Oferta para la base de datos MongoDB
 * @exports Oferta
 * @requires mongoose
 * @requires ../config/db_mongo
 */

const mongoose = require('mongoose');
require('../config/db_mongo'); // Conexión a BBDD MongoDB

/**
 * @typedef {Object} Oferta
 * @property {String} title Título de la oferta
 * @property {String} empresa Nombre de la empresa
 * @property {String} salario Salario ofrecido
 * @property {String} localizacion Localización de la oferta
 * @property {String} logo URL del logo de la empresa
 * @property {String} url URL de la oferta
 * @property {String} fuente Fuente de la oferta
 */

/**
 * Esquema para la colección Oferta en MongoDB.
 * @memberof MongoDB
 * @type {mongoose.Schema}
 */
const objectSchema = {
    title: { 
        type: String, 
        // required: true
    },
    empresa: { 
        type: String, 
        // required: true 
    },
    salario: { 
        type: String, 
        // required: true 
    },
    localizacion: {
        type: String,
        // required: true
    },
    logo: {
        type: String,
        // required: true
    },
    url: {
        type: String,
        // required: true
    },
    fuente: {
        type: String,
        // required: true
    }
};

// Crear el esquema de la oferta
const ofertaSchema = mongoose.Schema(objectSchema);

/**
 * Modelo para la colección Oferta en MongoDB.
 * @memberof MongoDB
 * @type {mongoose.Model}
 */
const Oferta = mongoose.model('Oferta', ofertaSchema);

module.exports = Oferta;
