const express = require('express');
const dotenv = require('dotenv').config();



//Creando el servidor con express
const app = express();

//Rutas
app.use('/api/auth', require('./routes/auth'));


//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
})