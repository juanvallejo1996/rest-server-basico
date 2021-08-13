const { Router } = require('express');
const { check } = require('express-validator');

// const { validarCampos } = require('../middelware/validar-campos');
// const { validarJWT } = require('../middelware/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middelware/validar-roles');

//Aquí se importa todo lo del middelware, mediante el index
const {
    validarCampos,
    validarJWT,
    esAdminRole, 
    tieneRole
} = require('../middelware');


const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet);


//Actualizar
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos //Esta función que está en middelware, hace que las validaciones retornen el error y no sigan al controller
], usuariosPut );
 

//Crear
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener más de 6 letras').isLength({ min:6 }),
    check('correo', 'El correo no es válido').isEmail(),
    //check('rol', 'No es un rol permitido').isIn([ 'ADMIN_ROLE', 'USER_ROLE' ]),
    check('rol').custom( esRoleValido ),
    check('correo').custom( emailExiste ),
    validarCampos,
    

], usuariosPost);

router.delete('/:id', [
    validarJWT,
    //esAdminRole, //Este middelware fuerza a que el usuario sea dministrador
    tieneRole( 'ADMIN_ROLE', 'VENTAS_ROLE' ),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos //Esta función que está en middelware, hace que las validaciones retornen el error y no sigan al controller
], usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router;