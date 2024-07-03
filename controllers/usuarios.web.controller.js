const ofertasService = require('../services/ofertas.sevices');

const getHome = async (req, res) => {
    try {
        res.status(200).render("home.pug");
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
};
const getLogin = async (req, res) => {
    try {
        res.status(200).render("login.pug");
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
};
const getRegistro = async (req, res) => {
    try {
        res.status(200).render("registro.pug");
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
};
const getPerfil = async (req, res) => {
    try {
        res.status(200).render("perfil.pug");
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
};
const getDashboard = async (req, res) => {
    try {
        res.status(200).render("dashboard.pug");
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
};

const getFavoritos = async (req, res) => {
    const email = req.params.email;
    let arrayIdSQL = [];
    try {
        const resp = await fetch(`http://localhost:3000/api/favoritos?email=email@jony.com`);
        // const resp = await fetch(`http://localhost:3000/api/favoritos?email=${email}`);
        const data = await resp.json();
        data.forEach(element => {
            arrayIdSQL.push(element.id_oferta)
        });
        const favoritosMongo = await ofertasService.listaOfertasPorId(arrayIdSQL);
        res.status(200).render("favoritos.pug", { Favoritos: favoritosMongo || [] });
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
};


const getUsers = async (req, res) => {
    try {
        const resp = await fetch('http://localhost:3000/api/usuarios');
        const data = await resp.json();
            res.status(200).render("users.pug", { Users: data });        
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
};

module.exports = {
    getHome,
    getLogin,
    getRegistro,
    getPerfil,
    getDashboard,
    getFavoritos,
    getUsers
}