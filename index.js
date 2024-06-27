const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express(); // Inicializar servidor
const port = 3000;

//Importar middlewares
const error404 = require("./middlewares/error404");
const morgan = require("./middlewares/morgan");

// Logger
app.use(morgan(':method :url :status - :response-time ms :body'));

// Rutas

app.use(express.json()); // Habilito recepción de JSON en servidor
app.use(express.urlencoded({extended: true}));

// CONFIGURACIÓN DE VISTAS PUG -- Motor de plantillas
app.set('view engine', 'pug');
app.set('views','./views');

app.use(express.static('public')); // Habilito la carpeta public para archivos estáticos

 //http://localhost:3000/api-docs/
//  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Habilitando ruta para docs swagger
//  //http://localhost:3000/api-jsdoc/
//  app.use('/api-jsdoc', express.static(path.join(__dirname, '/jsondocs')));

//Invocar middleware
app.use(error404); //Middleware para manejo de 404

app.listen(port, () => { // Servidor está escuchando en este puerto variable port
    console.log(`Example app listening on http://localhost:${port}`);
});