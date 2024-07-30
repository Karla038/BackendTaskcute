const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validacion_campos');
const { crearTask, obtenerTasks, actualizarTask, eliminarTask, obtenerTasksPorIdUsuario} = require('../controllers/task_controller');

const router = Router();

router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
        check('fechaVencimiento', 'La fecha de vencimiento es obligatoria y debe ser una fecha válida').isISO8601(),
        check('idUsuario', 'El ID del usuario es obligatorio y debe ser una cadena').isString(), // Validación para cadena
        validarCampos
    ],
    crearTask
);

router.get('/', obtenerTasks);

router.get('/usuario/:idUsuario', obtenerTasksPorIdUsuario); // Nueva ruta para obtener tareas por ID de usuario

router.put('/:id',
    [
        check('nombre', 'El nombre es obligatorio').optional().not().isEmpty(),
        check('descripcion', 'La descripción es obligatoria').optional().not().isEmpty(),
        check('fechaVencimiento', 'La fecha de vencimiento es obligatoria y debe ser una fecha válida').optional().isISO8601(),
        check('completada', 'El estado de completado debe ser un booleano').optional().isBoolean(),
        check('idUsuario', 'El ID del usuario debe ser una cadena').optional().isString(), // Validación para cadena
        validarCampos
    ],
    actualizarTask
);

router.delete('/:id', eliminarTask);

module.exports = router;
