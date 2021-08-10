const { response } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario')

const usuariosGet =  async (req, res = response) => {
    
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    /*Esta es una manera de hacerlo, pero para optimizar recursos se peude hacer con primse.all
    /*
    const usuarios = await Usuario.find( query )
        .skip( Number( desde) ) //Traer los registros a partir de un registro especifico
        .limit( Number( limite) ); //Define el limite de los registros a traer

    const total = await Usuario.countDocuments( query );
    */

    //Esta es una manera de hacer la misma consulta con un mejor tiempo de respuesta
    const [total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip( Number( desde) ) //Traer los registros a partir de un registro especifico
            .limit( Number( limite) ) //Define el limite de los registros a traer
    ])

    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async (req, res) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO: validar contra base de datos

    if ( password ){
         //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password.toString(), salt );
    }
    
    const usuario = await Usuario.findByIdAndUpdate( id, resto ); 

    res.status(400).json( usuario );
}

const usuariosPost = async (req, res) => {
    
    const { nombre, correo, password, rol } = req.body;

    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password.toString(), salt );

    //Guardar en bd
    await usuario.save();

    res.status(201).json({
        usuario
    });
}

const usuariosDelete = async (req, res) => {

    const { id } = req.params;

    //Fisicamente se borra -> No es recomendado
    //const usuario = await Usuario.findByIdAndDelete( id );

    //Se cambia el estado de acivo o innactivo
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );


    res.json(
        usuario
    );
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: "patch Api - Controller"
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}