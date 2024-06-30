const { body, param, query } = require("express-validator");

const validateCreateOferta = [
    body("title")
        .exists().withMessage("Title of product is required")
        .isString().withMessage("Title should be string"),
    body("empresa")
        .exists().withMessage("empresa content is required")
        .isString().withMessage("empresa should be string"),
    body("salario")
        .exists().withMessage("salario date is required")
        .isString().withMessage("salario should be string"),
    body("localizacion")
        .exists().withMessage("localizacion is required")
        .isEmail().withMessage("localizacion is required"),
    body("logo")
        .exists().withMessage("logo is required")
        .isString().withMessage("logo be string"),
    body("url")
        .exists().withMessage("url is required")
        .isString().withMessage("url be string")    
];

const validateDeleteOferta = [
    query('title').notEmpty().withMessage("Title should exist to delete an entry")
];

const validateUpdateOferta = [
    query('title').notEmpty().withMessage("Title should exist to update an ofert"),
    body("empresa")
        .exists().withMessage("empresa content is required")
        .isString().withMessage("empresa should be string"),
    body("salario")
        .exists().withMessage("salario date is required")
        .isString().withMessage("salario should be string"),
    body("localizacion")
        .exists().withMessage("localizacion is required")
        .isEmail().withMessage("localizacion is required"),
    body("logo")
        .exists().withMessage("logo is required")
        .isString().withMessage("logo be string"),
    body("url")
        .exists().withMessage("url is required")
        .isString().withMessage("url be string")    
];

module.exports = {
    validateCreateOferta,
    validateDeleteOferta,
    validateUpdateOferta
};