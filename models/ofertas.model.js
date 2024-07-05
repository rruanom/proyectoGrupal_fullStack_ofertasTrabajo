const mongoose = require('mongoose');
require('../config/db_mongo') // Conexión a BBDD MongoDB

const objectSchema = {
    title: { 
        type: String, 
        //required: true
    },
    empresa: { 
        type: String, 
        //required: true 
    },
    salario: { 
        type: String, 
        //required: true 
    },
    localizacion:{
        type: String,
        //required:true
    },
    logo: {
        type: String,
        //required: true
    },
    url: {
        type: String,
        //required: true
    },
    fuente: {
        type: String,
        //required: true
    }
};
// Crear el esquema
const ofertaSchema = mongoose.Schema(objectSchema);


// Crear el modelo --> Colección
const Oferta = mongoose.model('Oferta', ofertaSchema);

module.exports = Oferta;