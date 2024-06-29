const favorito = require('../models/favoritos.model');
const user = require('../models/usuarios.model');
// const {validationResult} = require("express-validator"); // Descomentar cuando se hayan realizado las validaciones

const getUsers = async (req, res) => {
    // let users;
    try {
        if (req.query.email || req.query.email == '') {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const users = await user.getUserByEmail(req.query.email);
            return res.status(200).json(users);
        }
        else {
            const users = await user.getNonAdminUsers();
            return res.status(200).json(users);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newUser = req.body;
        try {
            const response = await user.createUser(newUser);
            res.status(201).json({
                "items_created": response,
                data: newUser
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
};

const updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const modifiedUser = req.body; 
        try {
            const response = await author.updateUser(modifiedUser);
            res.status(201).json({
                "items_updated": response,
                data: modifiedUser
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
};

const deleteUser = async (req, res) => {
    let userSearch;
    if (req.params.email) {
        userSearch = await user.getUserByEmail(req.params.email);
        if (userSearch.length > 0) {
            await favorito.deleteFavoritos(req.params.email);
            await user.deleteUser(req.params.email);
            res.status(200).json({ message: `Se ha borrado el usuario con email: ${req.params.email}` })
        } else {
            res.status(404).json("No se ha encontrado el usuario")
        }
    }
    else {
        res.status(404).json("No se ha encontrado el usuario")
    }
};


module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}