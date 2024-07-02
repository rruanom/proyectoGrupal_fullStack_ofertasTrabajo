-- Crear tabla authors
CREATE TABLE users (
  id_user serial NOT NULL PRIMARY KEY, 
  name varchar(45) NOT NULL, 
  lastname varchar(45) NOT NULL, 
  username varchar(45) NOT NULL UNIQUE, 
  email varchar(100) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  isadmin BOOLEAN DEFAULT FALSE,
  islogged boolean DEFAULT FALSE,
  last_logged_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  image varchar(255)
);

--crear tabla de favoritos por usuario
CREATE TABLE favoritos (
    id_favorito serial NOT NULL PRIMARY KEY,
    id_user int NOT NULL,
    id_oferta varchar(100) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
    CONSTRAINT unique_favorite_user UNIQUE (id_oferta, id_user)
);

--Insertar ususarios
INSERT INTO users (name, lastname, username, email, password, isadmin, image, islogged, last_logged_date)
VALUES 
('Antonio', 'González', 'nitolez', 'email@antonio.com', '123456', false, 'imagenantonio.jpg', false, '2024-07-01 20:57:30.212678+00'),
('Roberto', 'Ruano', 'robertor', 'email@roberto.com', '123456', false, 'imagenroberto.jpg', false, '2024-07-01 20:57:30.212678+00'),
('Miguel', 'Pardal', 'mipaes', 'email@miguel.com', '123456', false, 'imagenmiguel.jpg', false, '2024-07-01 20:57:30.212678+00'),
('Jonás', 'V', 'jony', 'email@jonas.com', '123456', false, 'imagenjonas.jpg', false, '2024-07-01 20:57:30.212678+00')

--Insertar datos en favoritos
INSERT INTO favoritos (id_user, id_oferta)
VALUES
((SELECT id_user FROM users WHERE email='email@jonas.com'), 1),
((SELECT id_user FROM users WHERE email='email@jonas.com'), 2),
((SELECT id_user FROM users WHERE email='email@jonas.com'), 5),
((SELECT id_user FROM users WHERE email='email@antonio.com'), 2),
((SELECT id_user FROM users WHERE email='email@roberto.com'), 3),
((SELECT id_user FROM users WHERE email='email@roberto.com'), 5),
((SELECT id_user FROM users WHERE email='email@roberto.com'), 4),
((SELECT id_user FROM users WHERE email='email@roberto.com'), 7)

--Read todos los usuarios
SELECT id_user, name, lastname, username, image, password, isadmin
FROM users

--Buscar ususarios por email
SELECT id_user, name, lastname, username, image, password, isadmin
FROM public.users
WHERE email='email@jonas.com'

--Crear usuario
INSERT INTO users (name, lastname, username, email, password, image, isadmin)
VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
('Tomás', 'T', 'tomy', 'email@tomas.com', '123456', 'imagentomas.jpg', false);

--Actualizar usuarios por email
UPDATE users 
SET 
    name='Jony',
    lastname='Villanueva',
    username='jonybravo',
    email='email@jonas.com',
    password='123456',
    image='imagenjonas.jpg',
    isadmin='false'
WHERE email='email@jonas.com'

--Borrar usuario
DELETE FROM users
WHERE email='email@jonas.com'

--Crear favorito
INSERT INTO public.favoritos(id_user, id_oferta)
VALUES 
((SELECT id_user FROM users WHERE email='email@tomas.com'), 44);

--Read todos los favoritos
SELECT u.name, f.id_user, f.id_oferta
FROM favoritos AS f
INNER JOIN users AS u
ON u.id_user=f.id_user
ORDER BY f.id_user ASC

--Buscar favoritos por email de usuario
SELECT u.name, f.id_oferta
FROM favoritos AS f
INNER JOIN users AS u
ON u.id_user=f.id_user
WHERE u.email='email@jonas.com'
ORDER BY f.id_oferta;

--Borrar favortio
DELETE FROM favoritos
WHERE id_oferta=1 AND id_user=(SELECT id_user FROM users WHERE email='email@jonas.com');

--Borrar usuario y favoritos asociados en cascada
DELETE FROM favoritos WHERE user_id=(SELECT id_user FROM users WHERE email='email@tomas.com');



