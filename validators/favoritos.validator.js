const { body, query } = require("express-validator");

const validateGetFavoritosByEmail = [
    query('email')
        .notEmpty().withMessage("Email should be provided to get favoritos")
        .isEmail().withMessage("Valid email is required")
];

const validateCreateFavorito = [
    body("email")
        .exists().withMessage("User email is required")
        .isEmail().withMessage("Valid email is required"),
    body("id_oferta")
        .exists().withMessage("id_oferta is required")
        .isString().withMessage("id_oferta should be a string"),
];

const validateDeleteFavoritos = [
    query('email')
        .notEmpty().withMessage("Email should be provided to delete favoritos")
        .isEmail().withMessage("Valid email is required")
];

const validateDeleteFavorito = [
    body('id_oferta')
        .notEmpty().withMessage("id_oferta should be provided to delete favorito")
        .isString().withMessage("id_oferta should be a string")
];

module.exports = {
    validateGetFavoritosByEmail,
    validateCreateFavorito,
    validateDeleteFavoritos,
    validateDeleteFavorito
};
