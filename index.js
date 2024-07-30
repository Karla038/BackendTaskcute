const express = require('express');
const { dbConnection } = require('./database/config'); 
const cors = require('cors'); // Importa el paquete cors
require('dotenv').config();



//Creando el servidor con express
const app = express();
app.use(cors());


//Lectura y parseo del body o respuestas
app.use(express.json());

dbConnection().then(() => {
    console.log('La base de datos está conectada');
    // Aquí puedes agregar más lógica si es necesario
}).catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
});


//Rutas
app.use('/api/auth', require('./routes/auth_route'));
app.use('/api/tasks', require('./routes/task_route'));


//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
    
});