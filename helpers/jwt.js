const jwt = require('jsonwebtoken');

const generateJwt = (uid) => {

    return new Promise((resolve, reject)=>{


    const payload = {
        uid
    }

    //especify a algorit authenticated
    const optionsSignIn = {
        algorithm: 'HS256',
        expiresIn: '10m'
    }
    jwt.sign(payload, `${process.env.JWT_SECRET}`, optionsSignIn, function (error, token) {
        if (error) {
            console.log(error);
            reject('No se pudo generar el JWT')
        } else {
            console.log(token)
            resolve(token);
        }
        })
    });

}

const verificarToken = ( token ) => {

    return new Promise((resolve, reject)=>{
        jwt.verify(token,`${process.env.JWT_SECRET}`,(error,decode) =>{
            if(error){
                console.log(error);
                reject('No se pudo generar el JWT')
            }else{
                const fechaExpiracionLocal = new Date(decode.exp * 1000);
                console.log(fechaExpiracionLocal)
                const fechaInicalLocal = new Date(decode.iat * 1000);
                console.log(fechaInicalLocal);
                const fechaInicial = new Date(fechaInicalLocal);
                console.log("Fecha inicial " + fechaInicial)
                const fechaExpiracion = new Date(fechaExpiracionLocal);
                console.log("Fecha expiracion " + fechaExpiracion)
                const fechas = {
                    fechaInicial,
                    fechaExpiracion
                }
                resolve(fechas)
            }
        })

    }); 
}


module.exports = {
    generateJwt,
    verificarToken
}