
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

});

//Con este método se está sobre escribiento el toJSON, que retorna la info
//Se hace con una función normal, por el this, del scope que maneja, con función flecha no sirve
UsuarioSchema.methods.toJSON = function(){

    const { __v, password, ...usuario } = this.toObject();
    return usuario;

}

module.exports = model( 'Usuario', UsuarioSchema ); //Esto es lo que permite crear la colección en la bd