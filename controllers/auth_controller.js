const { response } = require('express');

const crearUsuario = (req, res = response) => {

    const { name, email, password} = req.body

    return res.json({
        ok:true,
        msg:'Registro',
        name,
        email,
        password
    })
}

const loginUsuario = (req, res = response) => {

    const { email, password} = req.body

    return res.json({
        ok:true,
        msg:'Login',
        email,
        password
    })
}

const revalidarToken = (req, res = response) => {
    return res.json({
        ok:true,
        msg:'Renovar Token'
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}