const mongoose= require('mongoose');

//const DB_Connection = 'mongodb+srv://task:NhL2iwmJHUPC6dxn@taskcute.swnl72m.mongodb.net/?retryWrites=true&w=majority&appName=TaskCute';
const DB_Connection = 'mongodb+srv://taskcute:rQ8VZKwCL2EAdkEh@cluster0.rfvwvoj.mongodb.net/taskcute';
const dbConnection = async() => {

    try {

        await mongoose.connect( DB_Connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            // useCreateIndex: true
        });

        console.log('db conectada')

    }catch (error) {
        console.log(error);
        throw new Error('Error al conectar con la BD')
    }
}


module.exports = {
    dbConnection
}
