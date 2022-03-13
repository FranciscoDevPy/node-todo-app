const Todo = require('../models/Todo.models');

/**
 * Validar que el id exista
 * Si no existe, lanzar un mensaje de error diciendo que no existe el id
 * @param {string} id 
 * @returns true
 */
const validateId = ( id )=>
{
    const todoModel = new Todo();
    const todoId = todoModel.existsId( id );
    if( !todoId ) throw new Error(`El id ${id} no existe`);
    return true;
}

module.exports = {
    validateId
}