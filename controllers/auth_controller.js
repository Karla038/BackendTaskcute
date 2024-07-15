const bcrypt = require('bcrypt');
const { authenticatedUser,savedUser } = require('../utils/constants');
const { generateJwt } = require('../helpers/jwt')
const { response } = require('express');
const UserSchema = require('../models/Users_models');


const createUser = async (req, res = response) => {

    const { name, email, password } = req.body;


    const user = new UserSchema(req.body);
    //let token = null;


    try {   
        const verifyEmail = await UserSchema.findOne({ email });

        if (verifyEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }

        const salt = bcrypt.genSaltSync();
        user.password = await bcrypt.hashSync(password, salt);

        console.log(user)
        const userSaved = await user.save();
        token = await generateJwt(userSaved._id);
        console.log('token' + token);

    } catch {
        console.log('Error al guarda la base de datos')
    }
    res.status(201).json({
        ok: true,
        msg: savedUser,
        user,
        token
    })
}

const loginUser = async (req, res = response) => {

    const { email, password } = req.body

    console.log(req.body);

    try {

        const usuarioDB = await UserSchema.findOne({ email });


        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Correo electronico o contraseña incorrectos'
            })
        }

        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña invalida',
            })
        }
        return res.status(200).json({
            msg: authenticatedUser,
            ok:true,
            token:token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error inesperado auth"
        })
    }


}

const revalidarToken = async(req, res = response) => {

    const token = await generateJwt(req.uid, req.name);

    return res.json({
        ok: true,
        token
    })
}


module.exports = {
    createUser,
    loginUser,
    revalidarToken
}