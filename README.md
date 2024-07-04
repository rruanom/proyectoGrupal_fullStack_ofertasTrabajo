
# Romian, búsqueda de ofertas Full-Stack

![Logo del proyecto](public/IMGs/logoRomian.png) 

Este proyecto consiste en una aplicación web para búsqueda de ofertas de trabajo FullStack. La aplicación está desarrollada utilizando MongoDB, Express.js, PostgreSQL, Node.js, JavaScript y pug, donde MongoDB se utiliza como base de datos NoSQL para almacenar datos de ofertas de empleo, mientras que PostgreSQL se emplea para almacenar y gestionar datos relacionales de usuarios y favoritos.



## Funcionalidades Principales

- **Búsqueda de Ofertas:** Los usuarios pueden buscar ofertas de trabajo utilizando un campo de búsqueda en la página principal.

- **Filtros:** Hay filtros disponibles para refinar las búsquedas de ofertas por diversos criterios.

- **Interacción con Ofertas:** Los usuarios pueden guardar ofertas como favoritas y visualizar detalles como empresa, localización y salario.

- **Autenticación y Autorización:** Implementa un sistema básico de registro y login para los usuarios.
## Estructura del Proyecto

El proyecto está organizado en las siguientes partes principales:

- **Frontend (Pug y CSS):**

    - Archivos Pug para las vistas HTML.
    - Hojas de estilo CSS para el diseño visual.
    - Integración de íconos y fuentes para mejorar la experiencia de usuario.

- **Backend (Node.js y Express.js):**

    - index.js: Configuración del servidor Express.js, manejo de rutas y middleware.
    - Middlewares: Manejo de errores (404 y otros) y logging utilizando morgan.
    - Rutas: Definición de rutas para la API y las páginas web.
    
- **Base de Datos:**

    - MongoDB: Almacenamiento de datos de ofertas de empleo utilizando Mongoose.
    - PostgreSQL: Gestión de datos relacionales de usuarios y favoritos utilizando consultas SQL directas.


- **Controladores y Modelos:**

    - Controladores: Lógica de negocio para manejar las operaciones de usuarios, ofertas y favoritos y sus relativos a web.
    - Modelos: Esquemas de Mongoose para definir la estructura de datos en MongoDB y consultas SQL para PostgreSQL.
    - Queries: Queries de SQL para montar la estructura de la base de datos.


- **Autenticación y Seguridad:**

    - Bcrypt.js y JWT: Encriptación de contraseñas y generación de tokens JWT para autenticación segura de usuarios.
    - Middlewares: Limitación en el relleno de campos.

## Instalación y Configuración

Para ejecutar localmente este proyecto, sigue estos pasos:

**Clona el Repositorio:**

```bash
git clone <URL-del-repositorio>
cd <nombre-del-directorio>
```

**Instala las Dependencias:**

```bash
npm install
```
**Configura las Variables de Entorno:**

Crea un archivo .env y configura variables como MONGO_URI, POSTGRES_URI, PORT, JWT_SECRET, etc.

**Ejecuta la Aplicación:**

```bash
npm start
```
## Tecnologías Utilizadas

- **Frontend:** Pug, JS, CSS, Bootstrap Icons, Font Awesome.
- **Backend:** Node.js, Express.js.
- **Base de Datos:** MongoDB (Mongoose) para ofertas de empleo y PostgreSQL para datos relacionales de usuarios y favoritos.
- **Seguridad:** Bcrypt.js, JSON Web Tokens (JWT).

## Dependencias
- bcrypt
- bcryptjs
- body-parser
- dotenv
- express
- express-session
- express-validator
- jsonwebtoken
- mongoose
- mongoose-sequence
- passport
- passport-google-oauth20
- pg
- pug
- puppeteer
- swagger-jsdoc
- swagger-ui-express
- jsdoc
- morgan
- nodemon
## Support

Este proyecto está abierto a contribuciones. Si deseas mejorar la aplicación, realiza un fork del repositorio, haz tus cambios y envía un pull request. Asegúrate de seguir las buenas prácticas de desarrollo y prueba tus cambios antes de enviarlos.

Para consultas, envia un email antonioglezt98@gmail.com, miguelpardalesparis@gmail.com o r.ruanomartin@gmail.com.

## Creado por 
Antonio, Miguel y Roberto en el bootcamp de Desarrollo Web en The Bridge.