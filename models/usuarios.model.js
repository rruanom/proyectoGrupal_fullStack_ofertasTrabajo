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
    const { name, lastname, username, email, password, image, isadmin, last_logged_date } = user;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createUser,[name, lastname, username, email, password, image, isadmin, last_logged_date])
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
    const { username, password, ref_email } = user;
    let client, result;
    try {
        client = await pool.connect();
        if (username) {
            const data = await client.query(queries.updateUsername, [username, ref_email])
            result = data.rowCount;
        }
        if (password) {
            const data = await client.query(queries.updatePassword, [password, ref_email])
            result = data.rowCount;
        }
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

//añado funciones necesarias para logIn y logOut
const existUser = async(email) => {
    let client, result;
    try{
        client = await pool.connect();
        const data = await client.query(`SELECT * FROM users WHERE email = $1 `,[email])
        result = data.rows[0]
    }catch(err){
        console.log(err);
        throw(err);
    }finally{
        client.release()
    }
    return result
};

const setLoggedTrue = async(email) => {
    let client, result;
    try{
        client = await pool.connect();
        const data = await client.query(`UPDATE users
                                        SET islogged = true 
                                        WHERE email = $1
                                        RETURNING *; `,[email])
        result = data.rows
    }catch(err){
        console.log(err);
        throw(err);
    }finally{
        client.release()
    }
    return result
};

const setLoggedFalse = async(email) => {
    let client, result;
    try{
        client = await pool.connect();
        const data = await client.query(`UPDATE users
                                        SET logged = false 
                                        WHERE email = $1
                                        RETURNING *; `,[email])
        result = data.rows
    }catch(err){
        console.log(err);
        throw(err);
    }finally{
        client.release()
    }
    return result
};

module.exports = {
    getUserByEmail,
    createUser,
    getNonAdminUsers,
    updateUser,
    deleteUser,
    existUser,
    setLoggedTrue,
    setLoggedFalse
}

// getNonAdminUsers().then(data=>console.log(data));

// getUserByEmail('email@miguel.com').then(data=>console.log(data));

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
//     "email": "email@melquiades44.com",
//     "password": "123456",
//     "image": "imagen.melquiades.jpg",
//     "isadmin": false,
//     "ref_email": "email@melquiades.com"
// }).then(data => console.log(data));

// deleteUser('email@miguel.com');