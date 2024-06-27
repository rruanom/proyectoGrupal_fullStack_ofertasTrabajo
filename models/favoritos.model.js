const { Pool } = require('pg');
const pool = require('../config/db_pgsql')
const queries = require('../queries/favoritos.queries') // Queries SQL

// GET usuarios que no son admin
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
    return result
};

//POST crear user
const createFavorito = async (favorito) => {
    const { titulo, url, id_user, description } = author;
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
    return result
};

//PUT actualizar user
const updateUser = async (user) => {
    const { name, lastname, username, email, password, image, isadmin } = author;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.updateUser,[name, lastname, username, email, password, image, isadmin]);
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
}; 

//DELETE borrar usuario
const deleteFavoritos = async (email) => {
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
    createUser,
    getNonAdminUsers,
    updateUser,
    deleteUser
}