const queries = {
    getFavoritosByEmail: `
    SELECT u.name, f.titulo, f.url, f.description
    FROM favoritos AS f
    INNER JOIN users AS u
    ON u.id_user=f.id_user
    WHERE u.email=$1
    ORDER BY f.titulo;`,
    getAllFavoritos: `
    SELECT u.name, f.titulo, f.url, f.id_user, f.description
    FROM favoritos AS f
    INNER JOIN users AS u
    ON u.id_user=f.id_user
    ORDER BY f.id_user DESC`,
    createFavorito: `
    INSERT INTO public.favoritos(titulo, url, id_user, description)
    VALUES 
    ($1, $2, (SELECT id_user FROM users WHERE email=$3), $4);`,
    updateFavorito: `
    UPDATE public.favoritos
    SET titulo=$1, description=$2, url=$3
    WHERE titulo=$4;`,
    deleteFavoritos:`
    DELETE FROM favoritos WHERE id_user=(SELECT id_user FROM users WHERE email=$1);`,
    deleteFavorito:`
    DELETE FROM favoritos
    WHERE titulo=$1`
}

module.exports = queries;