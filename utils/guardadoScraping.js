const ofertaService = require('../services/ofertas.sevices');
const Oferta = require('../models/ofertas.model'); // Asegúrate de usar el nombre correcto del modelo
const indeedDataSource = require('../utils/indeed.scraping');
const ticjobDataSource = require('../utils/ticjob.scraping');

const findOrSaveOfertas = async () => {
    const indeedData = await indeedDataSource.indeedDataBase;
    const ticjobData = await ticjobDataSource.ticjobsDataBase;
    const fullData = indeedData.concat(ticjobData);
    console.log(fullData)
    
    try {
        // Iterar sobre la lista de objetos
        for (let oferta of fullData) { // Usar for...of en lugar de for...in
            // Buscar el objeto por el atributo 'title'
            console.log(oferta);
            const response = await Oferta.find({ title: oferta.title });
            
            if (response.length === 0) {
                // Si no existe, crearlo
                const nuevaOferta = new Oferta(oferta);
                const insertResult = await nuevaOferta.save();
                console.log('Oferta creada:', insertResult);
            }
        }
    } catch (err) {
        console.error('Error al buscar/crear una oferta en la base de datos', err);
    }
}

// findOrSaveOfertas();

