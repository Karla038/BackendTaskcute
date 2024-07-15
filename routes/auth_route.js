// Rutas de usuarios / Auth
// host + /api/auth

const { Router } = require('express');
const { createUser,
        loginUser,
        revalidarToken
      } = require('../controllers/auth_controller');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validacion_campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post('/nuevo',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de minimo 8 caracteres').isLength({min:8}),
        validarCampos
    ], //middlewares
    createUser);

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de minimo 8 caracteres').isLength({min:8}),
        validarCampos
    ],
    loginUser);

router.get('/renovar', validarJWT, revalidarToken);

module.exports = router;