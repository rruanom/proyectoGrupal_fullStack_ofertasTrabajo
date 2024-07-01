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
    try {
        res.status(200).render("favoritos.pug");
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({ msj: `ERROR: ${error.stack}` });
    }
};
const getUsers = async (req, res) => {
    try {
        res.status(200).render("users.pug");
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