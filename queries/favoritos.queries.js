const queries = {
    getFavoritosByEmail: `
    SELECT u.name, u.email, f.id_oferta
    FROM favoritos AS f
    INNER JOIN users AS u
    ON u.id_user=f.id_user
    WHERE u.email=$1;`,
    getAllFavoritos: `
    SELECT u.name, f.id_oferta, f.id_user
    FROM favoritos AS f
    INNER JOIN users AS u
    ON u.id_user=f.id_user
    ORDER BY f.id_user DESC`,
    createFavorito: `
    INSERT INTO public.favoritos(id_user, id_oferta)
    VALUES 
    ((SELECT id_user FROM users WHERE email=$1), $2);`,
    deleteFavoritos:`
    DELETE FROM favoritos WHERE id_user=(SELECT id_user FROM users WHERE email=$1);`,
    deleteFavorito:`
    DELETE FROM favoritos
    WHERE id_oferta=$1`
}

module.exports = queries;