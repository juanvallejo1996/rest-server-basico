const Role = require('../models/role');
const Usuario = require('../models/usuario')

const esRoleValido = async (rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no está registrado en la BD`)
    }

}

const emailExiste = async ( correo = '') => {

    //Verificar si el correo existe
    const emailSearch = await Usuario.findOne({ correo });
    if( emailSearch ){
        throw new Error(`El email ${ correo } ya se encuentra registrado.`)
    }

}

const existeUsuarioPorId = async ( id ) => {

    //Verificar si el correo existe
    const existeUsuario = await Usuario.findById( id );
    if( !existeUsuario ){
        throw new Error(`El Id no existe ${ id }`)
    }

}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId

}