const { Router } = require('express');
const { check }  = require('express-validator');
const { validateId } = require('../helpers/validate-id');
const { validateRequest } = require('../middlewares/validate-request');
const { 
    getTodo, 
    createTodo, 
    deleteTodo, 
    deleteAllTodo 
} = require('../controllers/todo.controllers');

const router = Router();

router.get('/', getTodo);

router.post('/', 
    [
        check('todo', 'The todo field is required').notEmpty(),
        validateRequest,
        check('todo', 'The task can only contain 50 characters').isLength({ min: 1, max: 50 }),
        validateRequest
    ],
    createTodo
);

router.delete('/:id', 
    [
        check('id').custom( validateId ),
        validateRequest
    ],
    deleteTodo
);

router.delete('/', deleteAllTodo);

module.exports = router;