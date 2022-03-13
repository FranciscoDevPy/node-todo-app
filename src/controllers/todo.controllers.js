const Todo = require('../models/Todo.models');

const getTodo = async( req, res )=>
{
    const todoModel = new Todo();
    const data = todoModel.getTodo();
    res.status(200).json({data});
}

const createTodo = async( req, res)=>
{
    const todoModel = new Todo();
    const {todo} = req.body;
    const data = todoModel.createTodo(todo);
    res.status(201).json(data);
}

const deleteTodo = async( req, res)=>
{
    const todoModel = new Todo();
    const {id} = req.params;
    const data = todoModel.deleteTodo(id);
    res.json(data);
}

const deleteAllTodo = async( req, res)=>
{
    const todoModel = new Todo();
    const data = todoModel.deleteAllTodo();
    res.json(data);
}

module.exports = {
    getTodo,
    createTodo,
    deleteTodo,
    deleteAllTodo
}