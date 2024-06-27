-- Crear tabla authors
CREATE TABLE users (
  id_user serial NOT NULL PRIMARY KEY, 
  name varchar(45) NOT NULL, 
  lastname varchar(45) NOT NULL, 
  username varchar(45) NOT NULL, 
  email varchar(100) NOT NULL UNIQUE,
  image varchar(255)
);

--crear tabla de favoritos por usuario
CREATE TABLE usuario_favoritos (
    id_user serial NOT NULL PRIMARY KEY,
    favoritoID int NOT NULL,
)