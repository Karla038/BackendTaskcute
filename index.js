const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');
const fs = require('fs');



//Creando el servidor con express
const app = express();

//Base de datos 
dbConnection();

//Lectura y parseo del body o respuestas
app.use(express.json());

//Cors
// app.use(cors('*'));

//Rutas
app.use('/api/auth', require('./routes/auth_route'));
app.use('/api/tasks', require('./routes/task_route'));

// Leer certificados
const privateKey = fs.readFileSync('/etc/nginx/ssl/nginx-taskcute.key', 'utf8');
const certificate = fs.readFileSync('/etc/nginx/ssl/nginx-taskcute.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };


//Escuchar peticiones
// app.listen( process.env.PORT, () => {
//     console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
// });

// Escuchar peticiones con HTTPS
https.createServer(credentials, app).listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});