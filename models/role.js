
const { Schema, model } = require('mongoose'); //Esto para crear schemas de mongo

const RoleSchema = Schema({

    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }

})



module.exports = model( 'Role', RoleSchema )