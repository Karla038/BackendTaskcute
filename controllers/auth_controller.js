const { response } = require('express');

const crearUsuario = (req, res = response) => {
    res.json({
        ok:true,
        msg:'Registro'
    })
}

const loginUsuario = (req, res) => {
    res.json({
        ok:true,
        msg:'Login'
    })
}

const revalidarToken = (req, res) => {
    res.json({
        ok:true,
        msg:'Renovar Token'
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}