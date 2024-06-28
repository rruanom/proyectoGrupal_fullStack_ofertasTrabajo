/**
 * @namespace SQLQueries 
 * @exports favoritos
 * @description Funciones para manejar los favoritos en la base de datos
 * @memberof SQLQueries
 */

const { Pool } = require('pg');
const pool = require('../config/db_pgsql')
const queries = require('../queries/favoritos.queries') // Queries SQ

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
        const data = await client.query(queries.getFavoritosByEmail, [email])
        result = data.rows
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
 * @param {String} favorito.titulo Título del favorito
 * @param {String} favorito.url URL del favorito
 * @param {Number} favorito.id_user ID del usuario
 * @param {String} favorito.description Descripción del favorito
 * @return {Number} Devuelve el número de filas afectadas
 * @throws {Error} Error de consulta a la BBDD
 */
const createFavorito = async (favorito) => {
    const { titulo, url, id_user, description } = favorito;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createFavorito, [titulo, url, id_user, description])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

/**
 * Descripción de la función: Esta función elimina un favorito de la base de datos por el email del usuario.
 * @memberof SQLQueries 
 * @method deleteFavoritos 
 * @async
 * @param {String} email Email del usuario cuyos favoritos se eliminarán
 * @return {Array} Devuelve un array con los campos afectados
 * @throws {Error} Error de consulta a la BBDD
 */
const deleteFavoritos = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteFavorito, [email]);
        result = data.fields;
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
    deleteFavoritos
};
