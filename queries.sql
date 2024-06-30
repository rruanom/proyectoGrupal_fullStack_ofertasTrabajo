-- Crear tabla authors
CREATE TABLE users (
  id_user serial NOT NULL PRIMARY KEY, 
  name varchar(45) NOT NULL, 
  lastname varchar(45) NOT NULL, 
  username varchar(45) NOT NULL UNIQUE, 
  email varchar(100) NOT NULL UNIQUE,
  password varchar(45) NOT NULL,
  isadmin boolean NOT NULL DEFAULT FALSE,
  image varchar(255)
);

--crear tabla de favoritos por usuario
CREATE TABLE favoritos (
    id_favorito serial NOT NULL PRIMARY KEY,
    id_user int NOT NULL,
    titulo varchar(255) NOT NULL UNIQUE,
    description text NOT NULL,
    url varchar(255) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);

--Insertar ususarios
INSERT INTO users (name, lastname, username, email, password, isadmin, image)
VALUES 
('Antonio', 'González', 'nitolez', 'email@antonio.com', '123456', false, 'imagenantonio.jpg'),
('Roberto', 'Ruano', 'robertor', 'email@roberto.com', '123456', false, 'imagenroberto.jpg'),
('Miguel', 'Pardal', 'mipaes', 'email@miguel.com', '123456', false, 'imagenmiguel.jpg'),
('Jonás', 'V', 'jony', 'email@jonas.com', '123456', false, 'imagenjonas.jpg')

--Insertar datos en favoritos
INSERT INTO favoritos (titulo, url, id_user, description)
VALUES
('Example Title1', 'http://example1.com', (SELECT id_user FROM users WHERE email='email@jonas.com'), 'Descripción genérica'),
('Example Title2', 'http://example2.com', (SELECT id_user FROM users WHERE email='email@antonio.com'), 'Descripción genérica'),
('Example Title3', 'http://example3.com', (SELECT id_user FROM users WHERE email='email@roberto.com'), 'Descripción genérica')

--Read todos los usuarios
SELECT id_user, name, lastname, username, image, password, isadmin
FROM users

--Buscar ususarios por email
SELECT id_user, name, lastname, username, image, password, isadmin
FROM public.users
WHERE email='email@jonas.com'

--Crear usuario
INSERT INTO public.users(name, lastname, username, email, password, image, isadmin)
VALUES 
('Tomás', 'T', 'tomy', 'email@tomas.com', '123456', 'imagentomas.jpg');

--Actualizar usuarios por email
UPDATE users 
SET 
    name='Jony',
    lastname='Villanueva',
    username='jonybravo',
    email='email@jonas.com',
    password='123456',
    imagen='imagenjonas.jpg',
    isdamin='false'
WHERE email='email@jonas.com'

--Borrar usuario
DELETE FROM users
WHERE email='email@jonas.com'

--Crear favorito
INSERT INTO public.favoritos(titulo, url, id_user, description)
VALUES 
('Example Title4', 'http://example4.com', (SELECT id_user FROM users WHERE email='email@tomas.com'), 'Descripción genérica');

--Read todos los favoritos
SELECT u.name, f.titulo, f.url, f.id_user, f.description
FROM favoritos AS f
INNER JOIN users AS u
ON u.id_user=f.id_user
ORDER BY f.id_user DESC

--Buscar favoritos por email de usuario
SELECT u.name, f.titulo, f.url, f.description
FROM favoritos AS f
INNER JOIN users AS u
ON u.id_user=f.id_user
WHERE u.email='email@jonas.com'
ORDER BY f.titulo;

--Actualizar favoritos por título de favorito
UPDATE public.favoritos
SET titulo='Example Title1', description='Porbando queries', url='http://example1.com'
WHERE titulo='Example Title1';

--Borrar favortio
DELETE FROM favoritos
WHERE titulo='Example Title1';

--Borrar usuario y favoritos asociados en cascada
DELETE FROM favoritos WHERE user_id=(SELECT id_user FROM users WHERE email='email@tomas.com');



