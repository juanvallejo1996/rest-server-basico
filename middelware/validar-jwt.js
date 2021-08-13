const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario')

const validarJWT = async ( req = request, res = response, next ) => {

    const token = req.header('x-token');
    console.log(token);
    
    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la petición.'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        
        //Se crea una propiedad nueva con el uid
        const usuario = await Usuario.findById( uid );

        //Verificar si existe el usuario en la bd
        if ( !usuario ){
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe en la Base de datos.'
            })
        }

        // Verificar si el usuario está activo
        if ( !usuario.estado ){
            return res.status(401).json({
                msg: 'Token no válido - Usuario con estado false'
            })
        }

        req.usuario = usuario;

        next();

    } catch (error) {
        
        console.log( error );
        res.status(401).json({
            msg: 'Token no válido.'
        });

    }

}

module.exports = {
    validarJWT
}