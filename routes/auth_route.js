// Rutas de usuarios / Auth
// host + /api/auth

const { Router } = require('express');
const { crearUsuario,
        loginUsuario,
        revalidarToken
      } = require('../controllers/auth_controller');


const router = Router();

router.post('/nuevo', crearUsuario);

router.post('/', loginUsuario);

router.get('/renovar', revalidarToken);

module.exports = router;