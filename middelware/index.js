//Esta es una manera de exportar de forma más limpia
//Como en la carpeta middelware ya hay muchos archivos, se agrega un archivo index.js
//nodejs lo reconoce como el archivo principal de la carpeta y aquí hacemos las importaciones
//Luego se exporta y por ultimo se llama desde donde se necesite.

const validaCampos = require('../middelware/validar-campos');
const validarJWT = require('../middelware/validar-jwt');
const validaRoles = require('../middelware/validar-roles');

module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validaRoles
}