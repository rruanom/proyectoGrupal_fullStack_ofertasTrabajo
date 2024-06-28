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
            const response = await author.createAuthor(newUser);
            res.status(201).json({
                "items_created": response,
                data: newUser
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
};

module.exports = {
    getUsers,
    createUser
}