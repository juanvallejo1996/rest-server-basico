const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async ( req, res = response ) => {

    const { correo, password } = req.body;

    try {
        
        const usuario = await Usuario.findOne({ correo });
        
        //Verificar si el email existe
        if( !usuario ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - Correo'
            })
        }

        //Verificar si el usuario está activo
        if( !usuario.estado ){
            return res.status(400).json({
                msg: 'El usuario no está activo.'
            })
        }

        //Verificar la contraseña
        //Conla función compareSync valida si las contraseñas encriptadas coinciden
        const validPassword =  bcryptjs.compareSync( password.toString(), usuario.password );
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - Password'
            })
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario, 
            token
        })

    } catch (error) {
        console.log( error )
        res.status(500).json({
            msg: 'Hable con el administrador'
        });

    }




}

module.exports = {
    login
}