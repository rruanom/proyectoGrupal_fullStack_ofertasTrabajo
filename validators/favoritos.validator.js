const { body, query } = require("express-validator");

const validateGetFavoritosByEmail = [
    query('email')
        .notEmpty().withMessage("Email should be provided to get favoritos")
        .isEmail().withMessage("Valid email is required")
];

const validateCreateFavorito = [
    body("titulo")
        .exists().withMessage("Favorito title is required")
        .isString().withMessage("Title should be a string"),
    body("url")
        .exists().withMessage("Favorito URL is required")
        .isString().withMessage("URL should be a string"),
    body("email")
        .exists().withMessage("User email is required")
        .isEmail().withMessage("Valid email is required"),
    body("description")
        .exists().withMessage("Favorito description is required")
        .isString().withMessage("Description should be a string")
];

const validateDeleteFavoritos = [
    query('email')
        .notEmpty().withMessage("Email should be provided to delete favoritos")
        .isEmail().withMessage("Valid email is required")
];

const validateDeleteFavorito = [
    body('titulo')
        .notEmpty().withMessage("Titulo should be provided to delete favorito")
        .isString().withMessage("Titulo should be a string")
];

module.exports = {
    validateGetFavoritosByEmail,
    validateCreateFavorito,
    validateDeleteFavoritos,
    validateDeleteFavorito
};
