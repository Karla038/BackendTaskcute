const jwt = require('jsonwebtoken');

const generateJwt = (uid) => {

    return new Promise((resolve, reject)=>{


    const payload = {
        uid
    }

    //especify a algorit authenticated
    const optionsSignIn = {
        algorithm: 'HS256',
        expiresIn: '5m'
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


module.exports = {
    generateJwt
}