const { validationResult } = require('express-validator');

//Verificamos que no hubo errores en las validaciones del request
//si hubo un error, parar de leer las otras request y lanzar un error
const validateRequest = ( req, res, next )=>
{
    const errors = validationResult(req);
    if( !errors.isEmpty() )
    {
        return res.status(400).json(errors);
    }
    next();
}

module.exports = {
    validateRequest
}