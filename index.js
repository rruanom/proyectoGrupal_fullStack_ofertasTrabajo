const express = require("express");
// const swaggerUi = require('swagger-ui-express');  // Descomentar para usar swagger docs de rutas  
// const swaggerDocument = require('./swagger.json');// Descomentar para usar swagger docs de rutas
const app = express(); // Inicializar servidor
const port = 3000;
const path = require('path'); // Descomentar para usar jsdoc
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//Importar middlewares
const error404 = require("./middlewares/error404");
const morgan = require("./middlewares/morgan");

// Logger de Morgan
app.use(morgan(':method :url :status - :response-time ms :body'));

// Importar Rutas API
const rutasUsuarios = require('./routes/usuarios.routes');
const rutasFavortios = require('./routes/favoritos.routes');
const ofertasRoutes = require("./routes/ofertas.routes")

// Importar Rutas Web
const rutasWeb = require('./routes/web.routes');

app.use(express.json()); // Habilito recepción de JSON en servidor
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CONFIGURACIÓN DE VISTAS PUG -- Motor de plantillas
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public')); // Habilito la carpeta public para archivos estáticos

//Rutas API
app.use('/api/usuarios', rutasUsuarios);
app.use('/api/favoritos', rutasFavortios);
app.use('/api',ofertasRoutes);

//Rutas Web
app.use('/', rutasWeb);

//http://localhost:3000/api-docs/
//  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Habilitando ruta para docs swagger
//  //http://localhost:3000/api-jsdoc/
 app.use('/api-jsdoc', express.static(path.join(__dirname, '/jsondocs')));

//Invocar middleware
app.use(error404); //Middleware para manejo de 404
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = app.listen(port, () => { // Servidor está escuchando en este puerto variable port
    console.log(`Example app listening on http://localhost:${port}`);
});

module.exports = server;