const bcrypt = require('bcrypt');
const { authenticatedUser,savedUser } = require('../utils/constants');
const { generateJwt } = require('../helpers/jwt')
const { response } = require('express');
const UserSchema = require('../models/Users_models');


const createUser = async (req, res = response) => {

    const { email, password } = req.body;


    const user = new UserSchema(req.body);
    let token = null;


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
        user._id = undefined;
        console.log(user)
        const userSaved = await user.save();
        console.log(userSaved)
        token = await generateJwt(userSaved._id);
        console.log('token' + token);

    } catch(error) {
        console.log('Error al guarda la base de datos' + error)
    }
    res.status(201).json({
        ok: true,
        msg: savedUser,
        data:token
    })
}

const loginUser = async (req, res = response) => {

    const { email, password } = req.body

    console.log(req.body);

    let token = null;

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
        token = await generateJwt(usuarioDB._id);

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

const findByIdUser = async(req,res = response) =>{


    // obteniendo el parametro id para la busqueda por id
    const id = req.params._id;
    console.log(id)
    // Creando una variable donde almacenaria el usuario
    let user = null;
    try {
        user = await UserSchema.findById(id);
    } catch (error) {
        console.log(error);                        
        return res.json({
            ok: false,
            msg: 'Error inesperado '
        }).status(500);
    }
    if(!user){
        return res.json({
            ok: false,
            msg: 'El usuario no existe en la base de datos'
            
        }).status(404);
    }    
    user.password = undefined;
    return res.json({
        ok: true,
        msg: 'Busqueda por id se consulto correctamente',
        data: user
    }).status(200);
}


module.exports = {
    findByIdUser,
    createUser,
    loginUser,
    revalidarToken
}