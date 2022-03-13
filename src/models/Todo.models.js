const fs     = require('fs');
const uniqid = require('uniqid');
const logger = require('../logs/loggers');

class Todo 
{
    constructor()
    {
        this.todo = [];
        this.dbPath = './src/database/data.json';
        this.startDb();
    }

    //Lee documento data.json y lo almacena en la memoria de la instancia del objeto
    //Esto facilitaría mucho trabajar con los datos
    startDb()
    {
        try
        {
            //Si el documento data.json no existe, entonces crear
            if( !fs.existsSync( this.dbPath ) )
            {
                this.saveDb();
            }
            //leer el documento data.json
            const db = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
            this.todo = JSON.parse(db).todo;
        }
        catch (error)
        {
            logger.error(error);
        }
    }

    //retorna las tareas
    getTodo()
    {
        return this.todo;    
    }

    /**
     * Retornar id si es que existe
     * @param {string} id 
     * @returns {string} todoId
     */
    existsId(id)
    {
        let todoId = null;
        for ( const key in this.todo )
        {
            if( this.todo[key].id == id ) todoId = this.todo[key].id;
        }
        return todoId;
    }

    /**
     * Crear una tarea y luego retornar la tarea creada
     * @param {json} todo 
     * @returns {json} todo
     */
    createTodo( todo )
    {
        const dataTodo = {
            id: uniqid(),
            todo: todo
        };

        this.todo.unshift(dataTodo);
        this.saveDb();
        return dataTodo;
    }

    /**
     * Borrar una tarea y retornar la tarea eliminada
     * @param {string} id 
     * @returns {json} todo
     */
    deleteTodo( id )
    {
        let dataTodo = {};
        const listTodo = [];
        for ( const key in this.todo )
        {
            if( this.todo[key].id == id )
            {
                dataTodo = this.todo[key];
                delete this.todo[key];
            }
            else
            {
                listTodo.push(this.todo[key]);
            } 
        }

        this.todo = listTodo;        
        this.saveDb();
        return dataTodo;
    }

    /**
     * Borrar todas las tareas y retornar un mensaje
     * @returns {json} msg
     */
    deleteAllTodo()
    {
        this.todo = [];
        this.saveDb();
        return {
            msg: "Se borró todo!"
        }
    }
    //Guardar los datos en el documento data.json
    saveDb()
    {
        const data = JSON.stringify({todo: this.todo});
        fs.writeFileSync(this.dbPath, data);
    }
}   

module.exports = Todo;