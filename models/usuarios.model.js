/**
 * @authors 
 * Antonio González
 * Roberto Ruano
 * Miguel Pardal  
 * @exports users
 * @namespace SQLQueries 
 */

const { Pool } = require('pg');
const pool = require('../config/db_pgsql')
const queries = require('../queries/usuarios.queries'); // Queries SQL
const { deleteFavoritos } = require('../queries/favoritos.queries');

/**
 * Descripción de la función: Esta función busca un usuario por su email.
 * @memberof SQLQueries 
 * @method getUserByEmail 
 * @async
 * @param {String} email email del usuario
 * @return {Object} Devuelve el usuario encontrado en un objeto
 * @throws {Error} Error de consulta a la BBDD
 */
const getUserByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getUserByEmail, [email])
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
 * Descripción de la función: Esta función devuelve todos los usuarios que no son administradores.
 * @memberof SQLQueries 
 * @method getNonAdminUsers 
 * @async
 * @return {Array} Devuelve los usuarios no administradores en un array
 * @throws {Error} Error de consulta a la BBDD
 */
const getNonAdminUsers = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getNonAdminUsers)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
        // client.end();
    }
    return result;
};

/**
 * Descripción de la función: Esta función crea un nuevo usuario en la base de datos.
 * @memberof SQLQueries 
 * @method createUser 
 * @async
 * @param {Object} user Objeto que contiene los datos del nuevo usuario
 * @param {String} user.name Nombre del usuario
 * @param {String} user.lastname Apellido del usuario
 * @param {String} user.username Nombre de usuario
 * @param {String} user.email Email del usuario
 * @param {String} user.password Contraseña del usuario
 * @param {String} user.image Imagen del usuario
 * @param {Boolean} user.isadmin Indica si el usuario es administrador
 * @return {Number} Devuelve el número de filas afectadas
 * @throws {Error} Error de consulta a la BBDD
 */
const createUser = async (user) => {
    const { name, lastname, username, email, password, image, isadmin } = user;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createUser,[name, lastname, username, email, password, image, isadmin])
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
 * Descripción de la función: Esta función actualiza los datos de un usuario existente en la base de datos.
 * @memberof SQLQueries 
 * @method updateUser 
 * @async
 * @param {Object} user Objeto que contiene los nuevos datos del usuario
 * @param {String} user.name Nombre del usuario
 * @param {String} user.lastname Apellido del usuario
 * @param {String} user.username Nombre de usuario
 * @param {String} user.email Email del usuario
 * @param {String} user.password Contraseña del usuario
 * @param {String} user.image Imagen del usuario
 * @param {Boolean} user.isadmin Indica si el usuario es administrador
 * @return {Number} Devuelve el número de filas afectadas
 * @throws {Error} Error de consulta a la BBDD
 */
const updateUser = async (user) => {
    const { name, lastname, username, email, password, image, isadmin, ref_email } = user;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.updateUser,[name, lastname, username, email, password, image, isadmin, ref_email]);
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
 * Descripción de la función: Esta función elimina un usuario de la base de datos por su email.
 * @memberof SQLQueries 
 * @method deleteUser 
 * @async
 * @param {String} email Email del usuario a eliminar
 * @return {Array} Devuelve un array con los campos afectados
 * @throws {Error} Error de consulta a la BBDD
 */
const deleteUser = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteUser,[email]);
        result = data.fields;
    } catch (error) {
        console.log(error);
        throw error;
    }finally {
        client.release();
    }
    return result;
};



module.exports = {
    getUserByEmail,
    createUser,
    getNonAdminUsers,
    updateUser,
    deleteUser
}

// getNonAdminUsers().then(data=>console.log(data));

// getUserByEmail('email@tomas.com').then(data=>console.log(data));

// let newUser = { 
//     "name": "Melquíades",
//     "lastname": "Estrada",
//     "username": "meles64",
//     "email": "email@melquiades.com",
//     "password": "123456",
//     "image": "imagen.melquiades.jpg",
//     "isadmin": false
// }
// createUser(newUser).then(data=>console.log(data));

// updateUser({ 
//     "name": "Melquíades",
//     "lastname": "Estrada",
//     "username": "meles64",
//     "email": "email@melquiades.com",
//     "password": "123456",
//     "image": "imagen.melquiades.jpg",
//     "isadmin": false,
//     "ref_email": "email@melquiades.com"
// }).then(data => console.log(data));

// deleteUser('email@miguel.com');