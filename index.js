const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');


//Creando el servidor con express
const app = express();

//Base de datos 
dbConnection();

//Lectura y parseo del body o respuestas
app.use(express.json());

//Cors
app.use(cors('*'));

//Rutas
app.use('/api/auth', require('./routes/auth_route'));


//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
});