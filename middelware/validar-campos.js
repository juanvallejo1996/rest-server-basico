const { validationResult } = require('express-validator');


const validarCampos = ( req, res, next ) => {

    const errors = validationResult( req );

    if ( !errors.isEmpty() ){
        return res.status(400).json( errors );
    }

    next();//Esto indica que todo salió bien y se puede continuar

}

module.exports = {
    validarCampos
}