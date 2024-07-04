const ofertasService = require('../services/ofertas.sevices');
const user = require('../models/usuarios.model');

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
        const response = await fetch('http://localhost:3000/api/search', {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify({"fuente": "administrador"})  
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        res.status(200).render("dashboard.pug", { Ofertas: data });
    } catch (error) {
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


const deleteUser = async (req, res) => {
    // let userSearch;
    const { email } = req.body;
    console.log('C. Deleting user with email:', email);

    if (!email) {
        return res.status(400).json({ message: 'Missing email in request body' });
    }
    try {
        const resp = await user.deleteUser(email);
        res.status(201).json({
            "items_deleted": resp,
            data: email
        });
        
    } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
    }
};

module.exports = {
    getHome,
    getLogin,
    getRegistro,
    getPerfil,
    getDashboard,
    getFavoritos,
    getUsers,
    deleteUser
}