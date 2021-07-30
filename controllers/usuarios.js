const { response } = require('express');

const usuariosGet =  (req, res = response) => {
    
    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    
    res.json({
        msg: "Get Api - Controller",
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usuariosPut = (req, res) => {

    const id = req.params.id;

    res.status(400).json({
        msg: "put Api - Controller",
        id
    })
}

const usuariosPost = (req, res) => {
    
    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: "post Api - Controller",
        nombre, edad
    })
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: "delete Api - Controller"
    })
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: "patch Api - Controller"
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}