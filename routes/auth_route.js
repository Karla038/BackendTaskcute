// Rutas de usuarios / Auth
// host + /api/auth

const { Router } = require('express');
const { crearUsuario,
        loginUsuario,
        revalidarToken
      } = require('../controllers/auth_controller');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validacion_campos');

router.post('/nuevo',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de minimo 8 caracteres').isLength({min:8}),
        validarCampos
    ], //middlewares
     crearUsuario);

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de minimo 8 caracteres').isLength({min:8}),
        validarCampos
    ],
    loginUsuario);

router.get('/renovar', revalidarToken);

module.exports = router;