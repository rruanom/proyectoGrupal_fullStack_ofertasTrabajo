/**
 * @author Antonio González, Roberto Ruano, Miguel Pardal 
 * @exports manage404
 * @namespace Models
 */
/**
 * @namespace SQLQueries 
 * @exports favoritos
 * @description Funciones para manejar los favoritos en la base de datos
 * @memberof SQLQueries
 */

/**
 * @fileOverview Este archivo contiene las funciones para manejar los favoritos en la base de datos.
 * @authors 
 * Antonio González
 * Roberto Ruano
 * Miguel Pardal
 */

const { Pool } = require('pg');
const pool = require('../config/db_pgsql');
const queries = require('../queries/favoritos.queries'); // Queries SQL

/**
 * Descripción de la función: Esta función busca todos los favoritos de un usuario por su email.
 * @memberof SQLQueries 
 * @method getFavoritosByEmail 
 * @async
 * @param {String} email Email del usuario
 * @return {Array} Devuelve los favoritos encontrados en un array
 * @throws {Error} Error de consulta a la BBDD
 */
const getFavoritosByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getFavoritosByEmail, [email]);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

/**
 * Descripción de la función: Esta función crea un nuevo favorito en la base de datos.
 * @memberof SQLQueries 
 * @method createFavorito 
 * @async
 * @param {Object} favorito Objeto que contiene los datos del nuevo favorito
 * @param {String} favorito.email Email del usuario
 * @param {Number} favorito.id_oferta ID de la oferta
 * @return {Number} Devuelve el número de filas afectadas
 * @throws {Error} Error de consulta a la BBDD
 */
const createFavorito = async (favorito) => {
    const { email, id_oferta } = favorito;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.createFavorito, [email, id_oferta]);
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

/**
 * Descripción de la función: Esta función elimina un favorito de la base de datos.
 * @memberof SQLQueries 
 * @method deleteFavorito 
 * @async
 * @param {Number} id_oferta ID de la oferta a eliminar
 * @param {String} email Email del usuario
 * @return {Number} Devuelve el número de filas afectadas
 * @throws {Error} Error de consulta a la BBDD
 */
const deleteFavorito = async (id_oferta, email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteFavorito, [id_oferta, email]);
        result = data.rowCount;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.release();
    }
    return result;
};

module.exports = {
    getFavoritosByEmail,
    createFavorito,
    deleteFavorito
};

// Ejemplos de uso
// getFavoritosByEmail("email@roberto.com").then(data => console.log(data));

// let newFav = {
//     "email": "email@miguel.com",
//     "id_oferta": 89
// };
// createFavorito(newFav).then(data => console.log(data));

// deleteFavorito(2, 'email@miguel.com');
