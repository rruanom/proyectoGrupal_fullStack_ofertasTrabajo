const Oferta = require('../models/ofertas.model');

//listar ofertas GET
const listaOfertas = async () => {
    try {
        const oferta = await Oferta
            .find()
        console.log(oferta);
        return oferta;
    } catch (error) {
        console.log('Error listing oferta:', error);
    }
};

//listar ofertas por palabra clave
//listar ofertas por provincia
//listar ofertas por salario 
//listar ofertas por empresa

//crear nueva oferta
const createOferta= async (title, empresa, salario, localizacion, logo, url) => {
    try {
        const oferta = new Oferta({
            title,
            empresa,
            salario,
            localizacion,
            logo,
            url,
            fuente :"administrador"
        });
    
        const result = await oferta.save();
        console.log(result);
        return result;

    } catch (error) {
        console.log('Error creating provider:', error);
    }
};

const updateOferta = async (filter, update) => {
    try {
        const modifiedOferta = await Oferta
            .findOneAndUpdate(filter, update, {
                new: true
            });
        console.log(modifiedOferta);
        return modifiedOferta;
    } catch (error) {
        console.log('no se puede modificar la oferta, error:', error)
    }
};

const deleteOferta = async (filter) => {
    try {
        const removedOferta = await Oferta
            .deleteOne({ 'title': filter });
        console.log(removedOferta);
        return removedOferta;
    } catch (error) {
        console.log('Error borrando el producto:', error);
    }
};

module.exports = {
    listaOfertas,
    createOferta,
    updateOferta,
    deleteOferta
};